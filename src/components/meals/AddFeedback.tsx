import { motion } from 'framer-motion'
import { Button } from '../Button'
import { Input } from '../Input'
import { TextArea } from '../TextArea'

export function AddFeedback() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-4"
    >
      <h3 className="text-lg font-bold text-slate-200">Adicionar avaliação</h3>
      <div className="flex flex-col gap-4">
        <Input placeholder="Nota" />
        <TextArea placeholder="Mensagem" />
        <Button>Adicionar</Button>
      </div>
    </motion.div>
  )
}
