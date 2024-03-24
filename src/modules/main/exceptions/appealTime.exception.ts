import { HttpException } from '@nestjs/common'
import { HttpStatusCode } from 'axios'

export class AppealTimeException extends HttpException {
  constructor(appealGap?: number) {
    const statusCode = HttpStatusCode.BadRequest
    if (!appealGap) {
      super(`The end date must be later than the current date`, statusCode)

      return
    }

    super(`The end date must be no earlier than ${appealGap} year(-s) after the current date`, statusCode)
  }
}
