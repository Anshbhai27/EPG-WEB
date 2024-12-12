export default function ShowCard({ show }) {
  return (
    <div className="show-card p-4 border rounded">
      <h3 className="font-bold">{show.title}</h3>
      <p className="text-gray-600">
        {new Date(show.startTime).toLocaleTimeString()} - 
        {new Date(show.endTime).toLocaleTimeString()}
      </p>
    </div>
  )
}
