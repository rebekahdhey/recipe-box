import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { useFavorites } from '../context/FavoritesContext'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          ← All recipes
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Favorites</h1>

        {favorites.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-5xl">♡</p>
            <p className="mt-4 text-lg font-medium">No favorites yet</p>
            <p className="mt-1 text-neutral-500">Tap the heart on any recipe to save it here.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage