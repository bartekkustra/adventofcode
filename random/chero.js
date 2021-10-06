console.clear()
const name = 'Bart'
let age = 30

const arr = ['banana', 'orange', 'dupa']
const obj = {
  key: 'value',
}

const discord = [
  {
    name: 'Chero',
    age: 31,
  },
  {
    name: 'Nosek',
    age: 30,
  },
  {
    name: 'Olka',
    age: 23,
  },
  {
    name: 'Karola',
    age: 25,
  }
]

for(let i = 0; i < discord.length; i++) {
  console.log(`${discord[i].name} ma ${discord[i].age} lat`)
}

function sum(a, b) {
  return a + b
}

console.log(sum(2, 4))
