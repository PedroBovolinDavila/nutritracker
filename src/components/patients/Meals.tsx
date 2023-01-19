import { AnimatePresence } from 'framer-motion'
import { MealCard } from './MealCard'

export function Meals() {
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 mt-4">
      <div className="border-b-2 border-b-slate-600 pb-2">
        <strong className="font-bold text-xl text-slate-200">Refeições</strong>
      </div>
      <div className="flex gap-4 flex-col py-4">
        <AnimatePresence>
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
        </AnimatePresence>
      </div>
    </div>
  )
}
