import random

testId = 3
levelsAmount = 1
puzzlesAmount = 11
softSkillsAmount = 2
timeElapsedMin = 30
timeElapsedMax = 120
scoreMin = 68
scoreMax = 100


for level in range(1, levelsAmount + 1):
    for puzzle in range(1, puzzlesAmount + 1):
        for softSkill in range(1, softSkillsAmount + 1):
            print("INSERT INTO `checkpoints` (`checkpointid`, `test_testId`, `checkpointScore`, `checkpointMaxScore`, `softSkillId`, `levelId`, `puzzleId`, `timeElapsed`, `timeStamp`) VALUES (NULL, '" +  str(testId) + "','" + str(random.randrange(0,100)) + "','" + str(100) + "','" + str(softSkill) + "','" + str(level) + "','" + str(puzzle) + "','" + str(random.randrange(60,1200)) + "', current_timestamp());")
        