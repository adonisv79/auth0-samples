import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AuthConfiguration } from 'config/configuration';

@Injectable()
export class UsersService {
  private readonly auth0UserInfoPath: string;
  constructor(config: ConfigService) {
    const authConfig = config.get<AuthConfiguration>('auth');
    this.auth0UserInfoPath = `${authConfig.domainUri}/userinfo`;
  }

  async getCurrentUserAuth0Info(accessToken: string) {
    const response = await axios.get(this.auth0UserInfoPath, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.data) {
      throw new NotFoundException();
    }
    return response.data;
  }
}
