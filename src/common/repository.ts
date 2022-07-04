import { Logger } from '@nestjs/common';

export class GenericRepository {
  async runQuery(query: any): Promise<any> {
    let result: any;

    try {
      result = await query();
    } catch (error) {
      Logger.error(`genericRepository.runQuery -- ${error}`);
      return null;
    }

    return result;
  }
}
