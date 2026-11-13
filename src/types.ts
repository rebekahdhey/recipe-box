export interface Recipe {
  id: string
  name: string
  category: string
  area: string
  image: string
}

export interface MealDbMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strMealThumb: string
}

export interface Ingredient {
  name: string
  measure: string
}

export interface RecipeDetail extends Recipe {
  instructions: string
  ingredients: Ingredient[]
}