import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { api } from '../lib/axios'
import { prisma } from '../lib/prisma'

export async function getPatientData(ctx: GetServerSidePropsContext) {
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

  if (data.role === 'doctor') {
    return {
      redirectUrl: '/doctor',
    }
  }

  const patient = await prisma.patients.findUnique({
    where: {
      id: data.id,
    },
    include: {
      doctor: true,
      meals: true,
    },
  })

  if (!patient) {
    return {
      redirectUrl: '/signup',
    }
  }

  return { patient }
}
