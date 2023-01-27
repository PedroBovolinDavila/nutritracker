import Image from 'next/image'
import { Clock } from 'phosphor-react'
import { FoodCard } from './FoodCard'

export function MealSection() {
  return (
    <div className="w-full mt-4 max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex justify-between gap-8">
      <Image
        src="https://github.com/pedrobovolindavila.png"
        alt=""
        width={300}
        height={400}
        className="rounded-md"
      />
      <div>
        <div>
          <h2 className="text-xl text-slate-200 font-bold">Refeição 1</h2>

          <p className="text-slate-200">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            laudantium nobis exercitationem quae dolorem sequi. Exercitationem
            voluptate porro optio aperiam, molestias quos non officiis ab autem
            iure necessitatibus, quidem minus.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
        </div>
        <div className="flex gap-1 mt-4 items-center text-slate-300">
          <Clock /> 12:00
        </div>
      </div>
    </div>
  )
}
