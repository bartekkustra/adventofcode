# card=5764801
# door=17807724
card=17773298
door=15530095
subject=7

def transform(x, z):
  return pow(x, z, 20201227)

cardLoopSize=1
while transform(subject, cardLoopSize) != card:
  cardLoopSize += 1

doorLoopSize=1
while transform(subject, doorLoopSize) != door:
  doorLoopSize += 1

encr = transform(card, doorLoopSize)
print(cardLoopSize, doorLoopSize, encr)
