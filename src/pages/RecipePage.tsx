import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipe } from '../api'
import type { RecipeDetail } from '../types'
import FavoriteButton from '../components/FavoriteButton'

function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let ignore = false

    setIsLoading(true)
    setError(null)

    getRecipe(id)
      .then((data) => {
        if (!ignore) setRecipe(data)
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
  }, [id])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          to="/"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          ← All recipes
        </Link>

        {isLoading ? (
          <p className="py-24 text-center text-neutral-500">Loading...</p>
        ) : error ? (
          <p className="py-24 text-center text-neutral-500">{error}</p>
        ) : !recipe ? (
          <p className="py-24 text-center text-neutral-500">Recipe not found.</p>
        ) : (
          <article className="mt-8">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="aspect-[16/9] w-full rounded-3xl object-cover shadow-sm"
            />
            <p className="mt-8 text-sm font-medium uppercase tracking-wider text-orange-500">
              {recipe.category} · {recipe.area}
            </p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h1 className="text-4xl font-semibold tracking-tight">{recipe.name}</h1>
              <FavoriteButton recipe={recipe} />
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr]">
              <section>
                <h2 className="text-lg font-semibold">Ingredients</h2>
                <ul className="mt-4 divide-y divide-neutral-200 rounded-2xl bg-white px-4 ring-1 ring-black/5">
                  {recipe.ingredients.map((item) => (
                    <li key={item.name} className="flex justify-between gap-4 py-3 text-sm">
                      <span>{item.name}</span>
                      <span className="text-neutral-500">{item.measure}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold">Instructions</h2>
                <p className="mt-4 whitespace-pre-line leading-7 text-neutral-600">
                  {recipe.instructions}
                </p>
              </section>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}

export default RecipePage