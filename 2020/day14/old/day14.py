import itertools
from parse import parse

input = '''
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
'''.strip('\n')

rows = input.split('\n')

mem = {}
mask = ''
mask0 = 0
mask1 = 0
maskX = 0

for row in rows:
  p = parse("mask = {}", row)
  if p:
    mask = p[0]
    mask0 = int(p[0].replace('1', 'X').replace('0', '1').replace('X', '0'), 2)
    mask1 = int(p[0].replace('0', 'X').replace('X', '0'), 2)
    maskX = int(p[0].replace('1', '0').replace('0', '0').replace('X', '1'), 2)
    countXArr = [i for i in range(len(mask)) if mask[i] == 'X']
  else:
    parsed = parse('mem[{:d}] = {:d}', row)
    memIndex, memValue = parsed
    memIndex = (memIndex & ~maskX) | mask1
    for possibility in itertools.product('01', repeat=len(countXArr)):
      v = list(mask)
      for i, j in enumerate(possibility):
        v[countXArr[i]] = j
      addr = int(''.join(v), 2) | memIndex
      mem[addr] = memValue

print(sum(mem.values()))
