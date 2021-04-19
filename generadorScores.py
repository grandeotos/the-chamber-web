import random

testId = 1
softSkillsAmount = 4
scoreMin = 20
scoreMax = 101

for softSkill in range(1, softSkillsAmount + 1):
    print("INSERT INTO `scores` (`scoreId`, `test_testId`, `softSkill_idsoftSkill`, `softSkillScore`) VALUES (NULL, '" + str(testId) + "', '" + str(softSkill) + "', '" + str(random.randrange(scoreMin,scoreMax)) +"');")