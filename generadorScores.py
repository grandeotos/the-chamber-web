import random

testId = 2
softSkillsAmount = 2
scoreMin = 68
scoreMax = 101

for softSkill in range(1, softSkillsAmount + 1):
    print("INSERT INTO `scores` (`scoreId`, `test_testId`, `softSkill_idsoftSkill`, `softSkillScore`) VALUES (NULL, '" + str(testId) + "', '" + str(softSkill) + "', '" + str(random.randrange(scoreMin,scoreMax)) +"');")