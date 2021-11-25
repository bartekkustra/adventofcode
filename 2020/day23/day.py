import os
import time
os.system('cls')

sample=list('389125467')
the_input=list('368195742')

# input2 = sample.copy()
input2 = the_input.copy()
input2 = list(map(int, input2))
lowest = 1
highest = 9


MAX_ITEMS = 1000000
arrayToMax = list(range(highest + 1, MAX_ITEMS))
input2 = input2 + arrayToMax
# print(input2)

def getDestination(arr, three, max):
  curr = arr[0]
  while True:
    curr -= 1
    if curr < 1:
      curr = max
    if not(curr in three):
      break
  return curr

# game
start = time.time()
for i in range(1000):
  pickedUp = [input2[1], input2[2], input2[3]]
  destination = getDestination(input2, pickedUp, MAX_ITEMS)
  destinationIndex = input2.index(destination)
  # input2 = [input2[4]] + pickedUp + input2[5:len(input2)] + [input2[0]]
  input2 = input2[4:destinationIndex + 1] + pickedUp + input2[destinationIndex + 1:len(input2)] + [input2[0]]

end = time.time()
# print(input2)
print(f"Runtime of the app: {end - start}s")