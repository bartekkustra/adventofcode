// DAY 10 SOLUTION
// DONT EXPAND IF YOU DONT WANT SPOILERS

// sorting
const sortNumbersAsc = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

// input
let input = `103
131
121
151
118
12
7
2
90
74
160
58
15
83
153
140
166
1
148
33
165
39
100
135
68
77
25
9
54
94
101
55
141
22
97
35
57
117
102
64
109
114
56
51
125
82
154
142
155
45
75
158
120
5
19
61
34
128
106
88
84
137
96
136
27
6
21
89
69
162
112
127
119
161
38
42
134
20
81
48
73
87
26
95
146
113
76
32
70
8
18
67
124
80
93
29
126
147
28
152
145
159`.split('\n').map(el => parseInt(el, 10)).sort(sortNumbersAsc)
const maxValue = input[input.length - 1]
input.push(maxValue + 3)
input.unshift(0)


// part 1
const task1 = (data) => {
  n1 = 0
  n3 = 0

  for (let i = 0; i < data.length - 1; i++) {
      let diff = data[i + 1] - data[i]
      if(diff === 1) n1++
      if(diff === 3) n3++
  }

  return {n1, n3, n1n3: `${n1} * ${n3} = ${n1*n3}`}
}

// part 2
let memo = {}
let ans = 0
const distinctArrangements = (i) => {
  if (i === input.length - 1) return 1
  if (memo[i]) {
      return memo[i]
  }
  ans = 0
  for (let j = i + 1; j < input.length; j++) {
      if (input[j] - input[i] <= 3) {
          ans += distinctArrangements(j)
      }
  }
  memo[i] = ans
  return ans
}


// results
const task1_data = task1(input)
const task2_data = distinctArrangements(0)
console.log(task1_data)
console.log(task2_data)