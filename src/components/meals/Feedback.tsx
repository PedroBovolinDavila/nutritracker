import { FeedbackCard } from './FeedbackCard'

export function Feedback() {
  return (
    <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 h-max">
      <h3 className="text-lg font-bold text-slate-200">Avaliação</h3>
      <div className="mt-4 flex flex-col gap-2">
        <FeedbackCard title="Nota" value="7" />

        <FeedbackCard
          title="Mensagem"
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, in modi. Dolore tempore nostrum nam eius reiciendis nesciunt magni. Sed possimus vero reprehenderit assumenda enim at, voluptatum cupiditate distinctio adipisci."
        />
      </div>
    </div>
  )
}
