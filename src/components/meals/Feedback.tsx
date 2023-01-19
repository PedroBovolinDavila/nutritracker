import { FeedbackCard } from './FeedbackCard'
import { motion } from 'framer-motion'

export function Feedback() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 h-max"
    >
      <h3 className="text-lg font-bold text-slate-200">Avaliação</h3>
      <div className="mt-4 flex flex-col gap-2">
        <FeedbackCard title="Nota" value="7" />

        <FeedbackCard
          title="Mensagem"
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, in modi. Dolore tempore nostrum nam eius reiciendis nesciunt magni. Sed possimus vero reprehenderit assumenda enim at, voluptatum cupiditate distinctio adipisci."
        />
      </div>
    </motion.div>
  )
}
