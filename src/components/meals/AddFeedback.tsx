import { Button } from '../Button'
import { Input } from '../Input'
import { TextArea } from '../TextArea'

export function AddFeedback() {
  return (
    <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-slate-200">Adicionar avaliação</h3>
      <div className="flex flex-col gap-4">
        <Input placeholder="Nota" />
        <TextArea placeholder="Mensagem" />
        <Button>Adicionar</Button>
      </div>
    </div>
  )
}
