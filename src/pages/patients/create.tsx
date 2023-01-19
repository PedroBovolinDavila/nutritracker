import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Navbar } from '../../components/Navbar'

export default function CreatePatient() {
  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="w-full mt-4 max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-slate-200">Adicionar cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome completo" />
          <Input label="E-mail" />
          <Input label="Username" />
          <Input label="Idade" />
          <Input label="Senha de acesso" />
          <Input label="Repita a senha" />
          <div className="flex flex-col gap-2 h-max">
            <label htmlFor="avatar" className="text-slate-200">
              Foto
            </label>
            <input
              type="file"
              id="avatar"
              className="text-slate-100 rounded-md bg-slate-700 p-2 border-2 border-slate-600 outline-none hover:border-teal-500/50 focus:border-teal-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2 h-max">
            <label htmlFor="observations" className="text-slate-200">
              Observações
            </label>
            <textarea
              id="observations"
              className="text-slate-100 rounded-md bg-slate-700 p-2 border-2 border-slate-600 outline-none hover:border-teal-500/50 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
        <Button>Criar paciente</Button>
      </div>
    </div>
  )
}
