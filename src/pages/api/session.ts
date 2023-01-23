import { compare } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { sign } from 'jsonwebtoken'
import { setCookie } from 'nookies'

const createSessionBodySchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(['doctor', 'patient']),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { username, password, role } = createSessionBodySchema.parse(req.body)

    const user =
      role === 'doctor'
        ? await prisma.doctor.findUnique({
            where: { username },
          })
        : await prisma.patients.findUnique({
            where: { username },
          })

    if (!user) {
      return res.status(400).json({
        message: 'Email ou senha está incorreto, tente novamente.',
      })
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({
        message: 'Email ou senha está incorreto, tente novamente.',
      })
    }

    const token = sign({ role }, '123123', {
      subject: user.id,
      expiresIn: '1d',
    })

    setCookie({ res }, '@nutritracker-auth', token, {
      maxAge: 60 * 60 * 24, // 1 d
      path: '/',
    })

    return res.end()
  } catch {
    return res.status(400).json({
      message: 'Error',
    })
  }
}
