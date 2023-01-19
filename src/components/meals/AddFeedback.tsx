import { motion } from 'framer-motion'
import { Button } from '../Button'

export function AddFeedback() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-4"
    >
      <h3 className="text-lg font-bold text-slate-200">Adicionar avaliação</h3>
      <div className="flex flex-col gap-4">
        <div className="rounded-md text-slate-300">
          <label htmlFor="note" className="text-md">
            Nota:
          </label>
          <input
            type="number"
            id="note"
            className="bg-slate-900  border-2 border-transparent outline-none mt-1 rounded-md focus:border-teal-400 p-2"
          />
        </div>
        <div className="rounded-md text-slate-300">
          <label htmlFor="message">Mensagem:</label>
          <textarea
            id="message"
            className="bg-slate-900  border-2 border-transparent outline-none mt-1 rounded-md focus:border-teal-400 w-full p-2"
          />
        </div>
        <Button>Adicionar</Button>
      </div>
    </motion.div>
  )
}
