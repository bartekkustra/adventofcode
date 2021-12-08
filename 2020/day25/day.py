import os
import time
os.system('cls')

card=17773298
door=15530095
subject=7

def transform(x, z):
  return pow(x, z, 20201227)


start = time.time()
cardLoopSize=1
while transform(subject, cardLoopSize) != card:
  cardLoopSize += 1

doorLoopSize=1
while transform(subject, doorLoopSize) != door:
  doorLoopSize += 1

encr = transform(card, doorLoopSize)
end = time.time()

print(encr)
print(f"Runtime of the app: {end - start}s")