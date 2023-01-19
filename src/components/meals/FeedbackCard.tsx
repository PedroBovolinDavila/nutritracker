interface FeedbackCardProps {
  title: string
  value: string
}

export function FeedbackCard({ title, value }: FeedbackCardProps) {
  return (
    <div className="bg-slate-900 rounded-md text-slate-300 p-2 border-2 border-transparent hover:border-teal-600 transition-all">
      <strong>
        {title}
        <span className="text-teal-400 ml-1">:</span>
      </strong>
      <p className="mt-1">{value}</p>
    </div>
  )
}
