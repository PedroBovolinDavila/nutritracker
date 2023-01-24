import nextConnect from 'next-connect'
import multer from 'multer'
import { storage } from '../../../lib/storage'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

const upload = multer({ storage })

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.single('file'))

interface Req {
  file: {
    filename: string
  }
  query: {
    patientId: string
  }
}

apiRoute.patch(async (req: Req, res: NextApiResponse) => {
  const { filename } = req.file
  const { patientId } = req.query

  const { username } = await prisma.patients.update({
    where: { id: patientId },
    data: {
      avatar_url: filename,
    },
    select: { username: true },
  })

  return res.status(200).json({
    message: 'Avatar updated',
    content: {
      username,
    },
  })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false,
  },
}
