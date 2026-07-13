local combat = Combat()
combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_ENERGYDAMAGE)
combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_ENERGYAREA)
combat:setArea(createCombatArea(AREA_CIRCLE3X3))
combat:setFormula(COMBAT_FORMULA_LEVELMAGIC, -0.35, -20, -0.65, -40)

local arcaneBurst = Spell(SPELL_INSTANT)

function arcaneBurst.onCastSpell(creature, variant)
	return combat:execute(creature, variant)
end

arcaneBurst:name("Arcane Burst")
arcaneBurst:id(251)
arcaneBurst:words("exevo arcanum")
arcaneBurst:level(60)
arcaneBurst:mana(180)
arcaneBurst:group("attack")
arcaneBurst:cooldown(4000)
arcaneBurst:groupCooldown(2000)
arcaneBurst:isAggressive(true)
arcaneBurst:needLearn(false)
arcaneBurst:vocation("sorcerer", "master sorcerer", "druid", "elder druid")
arcaneBurst:register()
