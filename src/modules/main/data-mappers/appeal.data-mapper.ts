import { Injectable } from '@nestjs/common'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

@Injectable()
export class AppealDataMapper {
  postAppeal(appeal: AppealEntity): AppealEntity {
    return {
      ...appeal,
    }
  }
}
