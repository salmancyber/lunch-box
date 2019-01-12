import recipes from '@/assets/recipes.json'
import ingredients from '@/assets/ingredients.json'

export var getRecipes = () => {
  return recipes.recipes;
}

export var getIngredients = () => {
  return ingredients.ingredients;
}

export default {
  getRecipes,
  getIngredients
}