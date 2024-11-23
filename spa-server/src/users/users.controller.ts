import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessToken } from 'src/auth/auth.decorator';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/users')
export class UsersController {
  constructor(readonly service: UsersService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getCurrentUserInfo(@AccessToken() accessToken: string) {
    return this.service.getCurrentUserAuth0Info(accessToken);
  }
}
