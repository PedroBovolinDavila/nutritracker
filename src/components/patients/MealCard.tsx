import Image from 'next/image'
import { Clock } from 'phosphor-react'
import { useRouter } from 'next/router'

export function MealCard() {
  const router = useRouter()

  async function handleOpenMealDetails() {
    await router.push('/meals/refeicao1')
  }

  return (
    <div
      className="p-4 border-2 rounded-md border-slate-600 hover:border-teal-600 transition-all flex gap-4 cursor-pointer"
      onClick={handleOpenMealDetails}
    >
      <Image
        src="https://github.com/pedrobovolindavila.png"
        width={120}
        height={120}
        className="rounded-md"
        alt=""
      />

      <div>
        <strong className="text-lg text-slate-300 font-bold">Refeição 1</strong>
        <p className="text-slate-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
          delectus ea quia sint. Exercitationem assumenda, veritatis, mollitia
          aliquam delectus in deleniti, laboriosam nostrum rerum architecto
          veniam iste incidunt unde necessitatibus!
        </p>

        <div className="flex gap-1 items-center mt-4 text-slate-400">
          <Clock /> 12:00
        </div>
      </div>
    </div>
  )
}
