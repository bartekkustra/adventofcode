import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '21'
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
  let uniqueIngredients = new Set()
  let allergenList = new Map()
  let finalAllergens = new Map()
  // console.log(food)
  // console.log('\n----------------------------------\n')

  food.forEach((value, key) => {
    const {ingredients, allergens} = value
    for(const allergen of allergens) {
      if(allergenList.has(allergen)) {
        allergenList.set(allergen, new Set(ingredients.filter(i => allergenList.get(allergen).has(i))))
      } else {
        allergenList.set(allergen, new Set(ingredients))
      }
    }

    ingredients.forEach(ing => {
      uniqueIngredients.add(ing)
    })
  })

  // console.log(allergenList)

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
    keys = allergenList.keys()
  }

  // console.log('--------------------------------------')
  // console.log('unique', uniqueIngredients)
  // console.log('final', finalAllergens)
  
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

  console.log('unique ingredients:', uniqueIngredients.size)
  console.log('allergens:', finalAllergens.size)

  return sum
}

const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')
