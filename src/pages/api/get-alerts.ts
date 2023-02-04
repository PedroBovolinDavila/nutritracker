import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { prisma } from '../../lib/prisma'

interface Payload {
  role: string
  sub: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { '@nutritracker-auth': token } = parseCookies({ req })

  if (!token) {
    return res.status(401).end()
  }

  const { role, sub: id } = verify(token, '123123') as Payload

  const alerts =
    role === 'doctor'
      ? await prisma.doctorAlert.findMany({ where: { doctor_id: id } })
      : await prisma.patientAlert.findMany({ where: { patient_id: id } })

  return res.json({ alerts })
}
