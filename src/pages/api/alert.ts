import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

interface Payload {
  role: string
  sub: string
}

const createAlertBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  to: z.string().uuid(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { '@nutritracker-auth': token } = parseCookies({ req })

    if (!token) {
      return res.status(401).json({
        message: 'Token missing',
      })
    }

    const { role, sub: id } = verify(token, '123123') as Payload
    const { description, title, to } = createAlertBodySchema.parse(req.body)

    if (role === 'doctor') {
      await prisma.patientAlert.create({
        data: {
          description,
          title,
          doctor_id: id,
          patient_id: to,
        },
      })
    } else {
      await prisma.patientAlert.create({
        data: {
          description,
          title,
          doctor_id: to,
          patient_id: id,
        },
      })
    }

    return res.status(201).end()
  } catch {
    return res.status(400).end()
  }
}
