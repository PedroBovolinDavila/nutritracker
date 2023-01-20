import { useRouter } from 'next/router'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MultiStep } from '../../components/MultiStep'

export default function Register() {
  const router = useRouter()

  async function handleNextStep() {
    await router.push('/signup/add-description')
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
          activeStep={2}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Preencha os dados para o registro
          </h3>

          <div>
            <div className="flex flex-col gap-2 my-6">
              <Input placeholder="Username" />
              <Input placeholder="Senha" type="password" />
            </div>

            <Button onClick={handleNextStep}>Proximo passo</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
