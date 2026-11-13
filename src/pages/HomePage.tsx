import { useEffect, useState } from 'react'
import { searchRecipes } from '../api'
import CategoryChips from '../components/CategoryChips'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import { useDebounce } from '../hooks/useDebounce'
import type { Recipe } from '../types'
import { Link } from 'react-router-dom'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let ignore = false

    setIsLoading(true)
    setError(null)

    searchRecipes(debouncedQuery)
      .then((data) => {
        if (!ignore) {
          setRecipes(data)
          setCategory('All')
        }
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [debouncedQuery])

  const categories = ['All', ...new Set(recipes.map((r) => r.category))]

  const filtered = recipes.filter(
    (recipe) => category === 'All' || recipe.category === category
  )


  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="mx-auto max-w-5xl px-6 pt-16">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-orange-500">Recipe Box</p>
          <Link
            to="/favorites"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-black/5 transition hover:bg-neutral-100"
          >
            ♥ Favorites
          </Link>
        </div>
        <div className="mt-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="mt-4">
          <CategoryChips
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>
        
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">
        {isLoading ? (
          <p className="py-24 text-center text-neutral-500">Loading recipes...</p>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-5xl">😕</p>
            <p className="mt-4 text-lg font-medium">Something went wrong</p>
            <p className="mt-1 text-neutral-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-5xl">🍽️</p>
            <p className="mt-4 text-lg font-medium">No recipes found</p>
            <p className="mt-1 text-neutral-500">Try a different search.</p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
              className="mt-6 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App