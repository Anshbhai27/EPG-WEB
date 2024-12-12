export default function SearchBar({ onSearch }) {
  return (
    <input 
      type="text"
      placeholder="Search channels..."
      className="w-full p-2 mb-4 rounded border"
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}
