interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes, cuisines, categories..."
        className="w-full rounded-2xl bg-white py-4 pl-14 pr-5 text-base shadow-sm ring-1 ring-black/5 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  )
}

export default SearchBar