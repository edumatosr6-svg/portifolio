local config = {
	storage = 95000,
	cooldown = 24 * 60 * 60,
	reward = {
		itemId = 2160,
		count = 1,
		label = "crystal coin",
	},
}

local function formatRemaining(seconds)
	local hours = math.floor(seconds / 3600)
	local minutes = math.floor((seconds % 3600) / 60)
	local remainingSeconds = seconds % 60

	return string.format("%02dh %02dm %02ds", hours, minutes, remainingSeconds)
end

local dailyReward = TalkAction("!daily")

function dailyReward.onSay(player, words, param)
	local now = os.time()
	local availableAt = player:getStorageValue(config.storage)

	if availableAt > now then
		local remaining = availableAt - now
		player:sendTextMessage(
			MESSAGE_EVENT_ADVANCE,
			"Your next daily reward will be available in " .. formatRemaining(remaining) .. "."
		)
		return false
	end

	local reward = player:addItem(config.reward.itemId, config.reward.count)
	if not reward then
		player:sendCancelMessage("You do not have enough capacity or space for the daily reward.")
		player:getPosition():sendMagicEffect(CONST_ME_POFF)
		return false
	end

	player:setStorageValue(config.storage, now + config.cooldown)
	player:sendTextMessage(
		MESSAGE_EVENT_ADVANCE,
		string.format("Daily reward received: %dx %s.", config.reward.count, config.reward.label)
	)
	player:getPosition():sendMagicEffect(CONST_ME_MAGIC_GREEN)
	return false
end

dailyReward:separator(" ")
dailyReward:register()
