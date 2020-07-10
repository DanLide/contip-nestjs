import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    user.password = undefined;
    return user;
  }
}
