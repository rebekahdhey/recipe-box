import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Recipe } from '../types'

interface FavoritesContextValue {
  favorites: Recipe[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (recipe: Recipe) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const STORAGE_KEY = 'recipe-box:favorites'

function loadFavorites(): Recipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Recipe[]) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (id: string) => favorites.some((r) => r.id === id)

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((current) =>
      current.some((r) => r.id === recipe.id)
        ? current.filter((r) => r.id !== recipe.id)
        : [...current, recipe]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used inside a FavoritesProvider')
  }
  return context
}