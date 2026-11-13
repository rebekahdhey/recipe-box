import type { Ingredient, MealDbMeal, Recipe, RecipeDetail } from './types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

function toRecipe(meal: MealDbMeal): Recipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
  }
}

export async function searchRecipes(term: string): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(term)}`)

  if (!response.ok) {
    throw new Error('Could not load recipes')
  }

  const data: { meals: MealDbMeal[] | null } = await response.json()
  return (data.meals ?? []).map(toRecipe)
}

export async function getRecipe(id: string): Promise<RecipeDetail | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`)

  if (!response.ok) {
    throw new Error('Could not load this recipe')
  }

  const data: { meals: Record<string, string | null>[] | null } = await response.json()
  const meal = data.meals?.[0]

  if (!meal) return null

  const ingredients: Ingredient[] = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim() ?? ''
    if (name) ingredients.push({ name, measure })
  }

  return {
    id: meal.idMeal ?? id,
    name: meal.strMeal ?? '',
    category: meal.strCategory ?? '',
    area: meal.strArea ?? '',
    image: meal.strMealThumb ?? '',
    instructions: meal.strInstructions ?? '',
    ingredients,
  }
}