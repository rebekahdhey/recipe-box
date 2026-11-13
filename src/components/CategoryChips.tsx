interface CategoryChipsProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category === selected
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
              isActive
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 ring-1 ring-black/5 hover:bg-neutral-100'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryChips