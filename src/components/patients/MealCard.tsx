import Image from 'next/image'
import Link from 'next/link'
import { Meal } from '../../pages/patient'

interface MealCardProps {
  meal: Meal
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      href={`/meals/${meal.id}`}
      className="p-4 border-2 rounded-md border-slate-600 hover:border-teal-600 transition-all flex gap-4 cursor-pointer"
    >
      <Image
        src={`http://localhost:3000/uploads/${meal.image_url}`}
        width={120}
        height={120}
        className="rounded-md"
        alt=""
      />

      <div>
        <strong className="text-lg text-slate-300 font-bold">
          {meal.title}
        </strong>
        <p className="text-slate-300">{meal.description}</p>
      </div>
    </Link>
  )
}
