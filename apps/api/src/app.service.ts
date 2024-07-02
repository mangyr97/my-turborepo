import { Injectable } from '@nestjs/common';
import * as contract from 'contract';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
