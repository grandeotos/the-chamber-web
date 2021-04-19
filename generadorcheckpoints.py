import random

testId = 1
levelsAmount = 5
puzzlesAmount = 6
softSkillsAmount = 4
timeElapsedMin = 123
timeElapsedMax = 7200 
scoreMin = 20
scoreMax = 100


for level in range(1, levelsAmount + 1):
    for puzzle in range(1, puzzlesAmount + 1):
        for softSkill in range(1, softSkillsAmount + 1):
            print("INSERT INTO `checkpoints` (`checkpointid`, `test_testId`, `checkpointScore`, `checkpointMaxScore`, `softSkillId`, `levelId`, `puzzleId`, `timeElapsed`, `timeStamp`) VALUES (NULL, '" +  str(testId) + "','" + str(random.randrange(0,100)) + "','" + str(100) + "','" + str(softSkill) + "','" + str(level) + "','" + str(puzzle) + "','" + str(random.randrange(60,1200)) + "', current_timestamp());")
        