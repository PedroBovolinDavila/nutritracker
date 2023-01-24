import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const createPatientBodySchema = z.object({
  name: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string().email(),
  doctorId: z.string().uuid(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: `HTTP method ${req.method} is not allowed`,
    })
  }

  const { name, lastName, age, email, doctorId } =
    createPatientBodySchema.parse(req.body)

  const { id: patientId } = await prisma.patients.create({
    data: {
      age,
      email,
      lastName,
      name,
      doctor_id: doctorId,
      avatar_url: '',
      description: '',
      username: '',
      password: '',
    },
    select: {
      id: true,
    },
  })

  return res.status(201).json({
    message: 'Patient created',
    content: { patientId },
  })
}
