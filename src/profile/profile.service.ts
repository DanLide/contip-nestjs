import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Profile from './profile.entity';
import UpdateProfileDto from './dto/updateProfile.dto';
import CreateProfileDto from './dto/createProfile.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    // Use forwardRef() for avoiding circular dependency
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getProfileByUserId(userId: number) {
    const user = await this.usersService.getById(userId);
    if (user.profile) {
      return user.profile;
    }
    throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
  }

  async createProfile(profileData: CreateProfileDto) {
    const newProfile = this.profilesRepository.create(profileData);
    await this.profilesRepository.save(newProfile);
    return newProfile;
  }

  async updateProfileByUserId(userId: number, profile: UpdateProfileDto) {
    const profileFromDb = await this.getProfileByUserId(userId);
    const updatedProfile = {
      ...profileFromDb,
      ...profile,
    }
    await this.profilesRepository.save(updatedProfile);
    return updatedProfile;
  }
}
