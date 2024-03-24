import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { MAX_APPEAL_ENTRIES_COUNT, appealYearGap, isValidAgeToIpn } from 'src/modules/main/constants/appeal.constant'
import { AppealTimeException } from 'src/modules/main/exceptions/appealTime.exception'
import { Repository } from 'typeorm/repository/Repository'

import { IPostAppealResponse } from 'src/modules/main/interfaces/news'

import { PostAppealDto } from 'src/modules/main/dto/postAppeal.dto'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

import { AppealDataMapper } from 'src/modules/main/data-mappers/appeal.data-mapper'

@Injectable()
export class AppealsService {
  @InjectRepository(AppealEntity)
  private readonly appealsRepository: Repository<AppealEntity>

  constructor(private readonly appealDataMapper: AppealDataMapper) {}

  async postAppeal(body: PostAppealDto): Promise<IPostAppealResponse> {
    const appealsCount = await this.appealsRepository.count()

    if (appealsCount >= MAX_APPEAL_ENTRIES_COUNT) {
      throw new HttpException('Entries limit reached', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const finishedDate = new Date(body.finishedAt)
    const currDate = moment()
    const appealType = body.type.toLowerCase()
    const appealGap = appealYearGap[appealType]

    if (!isValidAgeToIpn(body.age, body.ipn)) {
      throw new BadRequestException('The given age is incorrect compared to ipn')
    }

    if (currDate.isAfter(finishedDate)) {
      throw new AppealTimeException()
    }

    const yearDiff = Math.abs(currDate.diff(finishedDate, 'years'))

    if (yearDiff < appealGap) {
      throw new AppealTimeException(appealGap)
    }

    const newAppeal = new AppealEntity({
      ...body,
      finishedAt: finishedDate.toISOString(),
    })
    const appealDbRes = await this.appealsRepository.save(newAppeal)
    const data = this.appealDataMapper.postAppeal(appealDbRes)

    return {
      data,
    }
  }
}
