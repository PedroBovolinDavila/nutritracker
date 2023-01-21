import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const createDoctorBodySchema = z.object({
  name: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string().email(),
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

  const { name, lastName, age, email } = createDoctorBodySchema.parse(req.body)

  const { id: doctorId } = await prisma.doctor.create({
    data: {
      age,
      email,
      lastName,
      name,
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
    message: 'Doctor created',
    content: { doctorId },
  })
}
