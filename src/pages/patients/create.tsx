import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Navbar } from '../../components/Navbar'
import { TextArea } from '../../components/TextArea'

export default function CreatePatient() {
  return (
    <div className="bg-gray-900 w-full h-screen p-4">
      <Navbar />

      <div className="w-full mt-4 max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-slate-200">Adicionar cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Nome completo" />
          <Input placeholder="E-mail" />
          <Input placeholder="Username" />
          <Input placeholder="Idade" />
          <Input placeholder="Senha de acesso" />
          <Input placeholder="Repita a senha" />
          <Input type="file" placeholder="Avatar" />
          <TextArea placeholder="Observações" />
        </div>
        <Button>Criar paciente</Button>
      </div>
    </div>
  )
}
