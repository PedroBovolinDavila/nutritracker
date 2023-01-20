import { useRouter } from 'next/router'
import { Button } from '../../components/Button'
import { MultiStep } from '../../components/MultiStep'
import { TextArea } from '../../components/TextArea'

export default function AddDescription() {
  const router = useRouter()

  async function handleNextStep() {
    await router.push('/signup/add-avatar')
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
          activeStep={3}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Faça uma breve descrição sobre você
          </h3>

          <div className="flex flex-col gap-6 mt-6">
            <TextArea placeholder="Descrição" />

            <Button onClick={handleNextStep}>Proximo passo</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
