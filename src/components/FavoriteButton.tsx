import type { MouseEvent } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import type { Recipe } from '../types'

interface FavoriteButtonProps {
  recipe: Recipe
  className?: string
}

function FavoriteButton({ recipe, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(recipe.id)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(recipe)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl shadow-sm ring-1 ring-black/5 backdrop-blur transition duration-200 hover:scale-110 active:scale-95 ${className}`}
    >
      <span className={active ? 'text-red-500' : 'text-neutral-400'}>
        {active ? '♥' : '♡'}
      </span>
    </button>
  )
}

export default FavoriteButton