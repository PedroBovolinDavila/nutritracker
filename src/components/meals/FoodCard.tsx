import { Scales } from 'phosphor-react'

export function FoodCard() {
  return (
    <div className="border-2 border-slate-700 hover:border-teal-400/70 transition-all w-max p-2 rounded-md text-slate-200">
      <h3 className="text-md">Filé de frango</h3>
      <div className="flex text-sm gap-1 items-center mt-1">
        <Scales /> 120g
      </div>
    </div>
  )
}
