import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { Gear, Power, Bell } from 'phosphor-react'
import { Alert } from '../pages/doctor'
import { IconButton } from './IconButton'

interface NavbarProps {
  alerts: Alert[]
}

export function Navbar({ alerts }: NavbarProps) {
  const router = useRouter()

  async function handleLogout() {
    destroyCookie(null, '@nutritracker-auth')

    await router.push('/signin')
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl text-slate-200">
        Nutri
        <span className="text-teal-400">Tracker</span>
      </Link>
      <div className="flex gap-2 text-xl text-slate-300">
        <IconButton
          icon={<Bell />}
          title="Ver alertas"
          alert={alerts.length > 0}
        />
        <IconButton icon={<Gear />} title="Configurações da conta" />
        <IconButton
          icon={<Power />}
          title="Sair da plataforma"
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}
