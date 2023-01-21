import multer from 'multer'
import { randomBytes } from 'node:crypto'

export const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (_req, file, callback) => {
    const hash = randomBytes(10).toString('hex')
    const filename = `${hash}-${file.originalname}`

    callback(null, filename)
  },
})
