import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IPostAppealResponse } from 'src/modules/main/interfaces/news'

import { PostAppealDto } from 'src/modules/main/dto/postAppeal.dto'

import { AppealsService } from 'src/modules/main/services/appeal.service'

@ApiTags('Appeals')
@Controller('appeal')
export class AppealControlller {
  constructor(private readonly appealsService: AppealsService) {}

  @Post('/create')
  async postCatById(@Body() body: PostAppealDto): Promise<IPostAppealResponse> {
    return await this.appealsService.postAppeal(body)
  }
}
