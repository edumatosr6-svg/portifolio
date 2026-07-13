local config = {
	actionId = 45001,
	cooldownStorage = 95001,
	cooldown = 20 * 60 * 60,
	minimumLevel = 100,
	minimumPlayers = 1,
	maximumPlayers = 5,
	timeLimit = 15 * 60,
	minimumDamage = 1,
	bossName = "Demon",
	bossPosition = Position(1005, 1005, 7),
	arenaCenter = Position(1005, 1005, 7),
	arenaRangeX = 7,
	arenaRangeY = 7,
	entryPositions = {
		Position(1002, 1005, 7),
		Position(1002, 1006, 7),
		Position(1002, 1007, 7),
		Position(1003, 1005, 7),
		Position(1003, 1006, 7),
	},
	exitPosition = Position(990, 1000, 7),
	reward = {
		itemId = 2160,
		count = 5,
		label = "crystal coins",
	},
}

local activeRuns = {}

local function sendFailure(player, message)
	player:sendCancelMessage(message)
	player:getPosition():sendMagicEffect(CONST_ME_POFF)
end

local function getParticipants(player)
	local party = player:getParty()
	if not party then
		return { player }
	end

	if party:getLeader():getId() ~= player:getId() then
		return nil, "Only the party leader can start the boss encounter."
	end

	local participants = { player }
	for _, member in ipairs(party:getMembers()) do
		participants[#participants + 1] = member
	end

	return participants
end

local function validateParticipants(participants)
	if #participants < config.minimumPlayers or #participants > config.maximumPlayers then
		return false, string.format(
			"The encounter requires between %d and %d players.",
			config.minimumPlayers,
			config.maximumPlayers
		)
	end

	local now = os.time()
	for _, participant in ipairs(participants) do
		if participant:getLevel() < config.minimumLevel then
			return false, participant:getName() .. " does not meet the minimum level."
		end

		local availableAt = participant:getStorageValue(config.cooldownStorage)
		if availableAt > now then
			return false, participant:getName() .. " is still on boss cooldown."
		end
	end

	return true
end

local function isArenaOccupied()
	local spectators = Game.getSpectators(
		config.arenaCenter,
		false,
		false,
		config.arenaRangeX,
		config.arenaRangeX,
		config.arenaRangeY,
		config.arenaRangeY
	)

	return #spectators > 0
end

local function removePlayers(participantIds)
	for _, playerId in ipairs(participantIds) do
		local player = Player(playerId)
		if player then
			player:teleportTo(config.exitPosition)
			config.exitPosition:sendMagicEffect(CONST_ME_TELEPORT)
		end
	end
end

local function expireEncounter(bossId)
	local run = activeRuns[bossId]
	if not run then
		return
	end

	local boss = Monster(bossId)
	if boss then
		boss:remove()
	end

	removePlayers(run.participantIds)
	activeRuns[bossId] = nil
end

local function getPlayerDamage(damageMap, playerId)
	local total = 0

	for attackerId, damageData in pairs(damageMap) do
		if attackerId == playerId then
			total = total + damageData.total
		else
			local attacker = Creature(attackerId)
			local master = attacker and attacker:getMaster()
			if master and master:isPlayer() and master:getId() == playerId then
				total = total + damageData.total
			end
		end
	end

	return total
end

local bossDeath = CreatureEvent("PortfolioBossDeath")

function bossDeath.onDeath(creature, corpse, killer, mostDamageKiller, unjustified, mostDamageUnjustified)
	local bossId = creature:getId()
	local run = activeRuns[bossId]
	if not run then
		return true
	end

	local damageMap = creature:getDamageMap()
	for _, playerId in ipairs(run.participantIds) do
		local player = Player(playerId)
		local damage = getPlayerDamage(damageMap, playerId)

		if player and damage >= config.minimumDamage then
			local reward = player:addItem(config.reward.itemId, config.reward.count)
			if reward then
				player:sendTextMessage(
					MESSAGE_EVENT_ADVANCE,
					string.format("Boss defeated! Reward: %dx %s.", config.reward.count, config.reward.label)
				)
			else
				player:sendTextMessage(MESSAGE_EVENT_ADVANCE, "Boss defeated, but your reward did not fit.")
			end
		elseif player then
			player:sendTextMessage(MESSAGE_EVENT_ADVANCE, "No reward: minimum boss damage was not reached.")
		end
	end

	activeRuns[bossId] = nil
	addEvent(removePlayers, 3000, run.participantIds)
	return true
end

bossDeath:register()

local bossLever = Action()

function bossLever.onUse(player, item, fromPosition, target, toPosition, isHotkey)
	local participants, participantError = getParticipants(player)
	if not participants then
		sendFailure(player, participantError)
		return true
	end

	local valid, validationError = validateParticipants(participants)
	if not valid then
		sendFailure(player, validationError)
		return true
	end

	if isArenaOccupied() then
		sendFailure(player, "The boss arena is currently occupied.")
		return true
	end

	local boss = Game.createMonster(config.bossName, config.bossPosition, true, true)
	if not boss then
		sendFailure(player, "The boss could not be created. Check its name and position.")
		return true
	end

	if not boss:registerEvent("PortfolioBossDeath") then
		boss:remove()
		sendFailure(player, "The boss event could not be registered.")
		return true
	end

	local participantIds = {}
	local movedIds = {}
	for index, participant in ipairs(participants) do
		participantIds[#participantIds + 1] = participant:getId()
		if not participant:teleportTo(config.entryPositions[index]) then
			boss:remove()
			removePlayers(movedIds)
			sendFailure(player, "A player could not be teleported. Check the arena entry positions.")
			return true
		end

		movedIds[#movedIds + 1] = participant:getId()
		config.entryPositions[index]:sendMagicEffect(CONST_ME_TELEPORT)
	end

	local cooldownUntil = os.time() + config.cooldown
	for _, participant in ipairs(participants) do
		participant:setStorageValue(config.cooldownStorage, cooldownUntil)
	end

	local bossId = boss:getId()
	activeRuns[bossId] = { participantIds = participantIds }
	addEvent(expireEncounter, config.timeLimit * 1000, bossId)
	return true
end

bossLever:aid(config.actionId)
bossLever:register()
