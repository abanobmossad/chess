import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelperService {
  constructor(private readonly configService: ConfigService) {}
}
