import { useRouter } from 'next/router'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MultiStep } from '../../components/MultiStep'

export default function AddAvatar() {
  const router = useRouter()

  async function handleNextStep() {
    await router.push('/doctor/pedrodavila')
  }

  return (
    <div className="bg-gray-900 w-full h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <MultiStep
          steps={[
            'Informações pessoais',
            'Cadastro',
            'Descrição',
            'Foto de perfil',
          ]}
          activeStep={4}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Adicione uma foto de perfil
          </h3>

          <div className="flex flex-col gap-6 mt-6">
            <Input type="file" />

            <Button onClick={handleNextStep}>Finalizar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
