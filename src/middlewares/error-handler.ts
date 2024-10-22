import { CustomAPIError } from '@/errors/custom-error'
import { Request, Response, NextFunction } from 'express'

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ code: 400, msg: 'Something went wrong' })
}

export default errorHandlerMiddleware;