import Link from 'next/link'

export function Actions() {
  return (
    <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex-1 h-max my-auto">
      <h3 className="text-lg font-bold text-slate-200">Ações</h3>
      <div className="flex items-center justify-between h-full gap-4 mt-8">
        <Link
          href="/patients/create"
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Adicionar paciente
        </Link>
        <Link
          href="/patients/create-recipe"
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Criar receita
        </Link>
        <Link
          href="/patients/create-alert"
          className="bg-slate-700 border-2 border-slate-600 w-3/4 p-4 rounded-md flex gap-2 flex-col justify-center items-center text-slate-100 font-bold text-lg hover:border-teal-500 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Adicionar alerta
        </Link>
      </div>
    </div>
  )
}
