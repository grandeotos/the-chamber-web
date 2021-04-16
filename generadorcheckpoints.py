import random

niveles = ["T", "2", "3" , "4", "F"]

skills = ["T", "L", "R", "I"]
# 
# 
# while(True):
#     print(sql1 + "N" + random.choice(niveles) + "P" + str(random.randrange(1, 6)) + random.choice(skills) + sql3)



for i in range(1, 5):
    for j in range(1, 7):
        for k in range(1, 6):
            print("INSERT INTO `checkpoints` (`checkpointid`, `idprueba`, `score`, `maxScore`, `idsoftSkill`, `idlevel`, `idPuzzle`, `timeElapsed`, `timeStamp`) VALUES (NULL, '1','" + str(random.randrange(0,100)) + "','" + str(100) + "','" + str(k) + "','" + str(i) + "','" + str(j) + "','" + str(random.randrange(60,1200)) + "', current_timestamp());")
        