import type { Recipe } from '../types'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

interface RecipeCardProps {
  recipe: Recipe
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <FavoriteButton recipe={recipe} className='absolute right-3 top-3'/>
      </div>
      <div className='px-1 pb-1 pt-4'>
        <p className='text-xs font-medium uppercase tracking-wider text-orange-500'>
          {recipe.category}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">{recipe.name}</h3>
        <p className="text-sm text-neutral-500">{recipe.area} cuisine</p>
      </div>
    </Link>
  )
}

export default RecipeCard