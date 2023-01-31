import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcrypt'

const registerDoctorBodySchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({
      message: `HTTP method ${req.method} is not allowed`,
    })
  }

  const { username, password } = registerDoctorBodySchema.parse(req.body)
  const id = String(req.query.doctorId)

  if (!id) {
    return res.status(400).json({
      message: `Id is missing`,
    })
  }

  const doctorExists = await prisma.doctor.findUnique({
    where: { username },
  })

  if (doctorExists) {
    return res.status(400).json({
      message: `O username ${username} já esta em uso, escolha outro.`,
    })
  }

  const hashedPassword = await hash(password, 8)

  await prisma.doctor.update({
    where: { id },
    data: {
      username,
      password: hashedPassword,
    },
  })

  return res.status(200).end()
}
