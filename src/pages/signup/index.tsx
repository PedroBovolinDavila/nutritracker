import { useRouter } from 'next/router'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MultiStep } from '../../components/MultiStep'

export default function SignUp() {
  const router = useRouter()

  async function handleNextStep() {
    await router.push('/signup/register')
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
          activeStep={1}
        />

        <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
          <h3 className="text-lg font-bold text-slate-200">
            Preencha suas informações pessoais
          </h3>

          <div>
            <div className="grid grid-cols-2 my-6 gap-2">
              <Input placeholder="Nome" />
              <Input placeholder="Sobrenome" />
              <Input placeholder="Idade" type="number" />
              <Input placeholder="E-mail" type="email" />
            </div>

            <Button onClick={handleNextStep}>Proximo passo</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
