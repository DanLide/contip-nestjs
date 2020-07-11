import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import RequestWithUser from '../utils/requestWithUser.interface';
import UpdateProfileDto from './dto/updateProfile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getUserProfile(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.profileService.getProfileByUserId(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch()
  async updateUserProfile(@Req() request: RequestWithUser) {
    const { user } = request;
    const profile: UpdateProfileDto = request.body;
    return this.profileService.updateProfileByUserId(user.id, profile);
  }
}
