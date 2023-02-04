import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { api } from '../lib/axios'
import { prisma } from '../lib/prisma'

export async function getDoctorData(ctx: GetServerSidePropsContext) {
  const { req } = ctx

  const { '@nutritracker-auth': token } = parseCookies({ req })

  if (!token) {
    return {
      redirectUrl: '/signin',
    }
  }

  const { data } = await api.post('http://localhost:3000/api/validate-token', {
    token,
  })

  if (data.role === 'patient') {
    return {
      redirectUrl: '/patient',
    }
  }

  const doctor = await prisma.doctor.findUnique({
    where: {
      id: data.id,
    },
    include: {
      patients: true,
      doctorAlerts: true,
    },
  })

  if (!doctor) {
    return {
      redirectUrl: '/signup',
    }
  }

  return { doctor }
}
