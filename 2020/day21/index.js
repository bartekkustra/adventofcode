import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')
let food = new Map()
input.forEach((line, index) => {
  const rgxp = line.match(/^(?<ingredients>.*) \((?<allergens>.*)\)$/)
  let {ingredients, allergens} = rgxp.groups
  ingredients = ingredients.trim().split(' ')
  allergens = allergens.replace('contains', '').trim().split(', ')
  food.set(index, {ingredients, allergens})
});

const part1 = () => {
  let allergenList = new Map()
  let finalAllergens = new Map()

  food.forEach((value, key) => {
    const {ingredients, allergens} = value
    for(const allergen of allergens) {
      if(allergenList.has(allergen)) {
        allergenList.set(allergen, new Set(ingredients.filter(i => allergenList.get(allergen).has(i))))
      } else {
        allergenList.set(allergen, new Set(ingredients))
      }
    }
  })


  let keys = [...allergenList.keys()]

  while(keys.length > 0) {
    allergenList.forEach((value, key) => {
      if(value.size === 1) {
        const ingredientName = [...allergenList.get(key)].join('') 
        finalAllergens.set(key, ingredientName)
        allergenList.delete(key)
        
        allergenList.forEach((_value, _key) => {
          allergenList.get(_key).delete(ingredientName)
        })
      }
    })
    keys = [...allergenList.keys()]
  }
  
  let countIngredients = new Map()
  let sum = 0
  food.forEach((value, key) => {
    const {ingredients, allergens} = value
    ingredients.forEach(ing => {
      if(![...finalAllergens.values()].includes(ing)) {
        if(countIngredients.has(ing)) {
          const value = countIngredients.get(ing) + 1
          countIngredients.set(ing, value)
          sum++
        } else {
          countIngredients.set(ing, 1)
          sum++
        }
      }
    })
  })

  return {finalAllergens, sum}
}

const part2 = (allergens) => {
  const listOfAllergens = [...allergens.keys()].sort()
  let ingredientsArr = []
  listOfAllergens.forEach(allergen => {
    ingredientsArr.push(allergens.get(allergen))
  })
  return ingredientsArr.join(',')
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2(p1.finalAllergens)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1.sum)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2020, day, {p1, p2})