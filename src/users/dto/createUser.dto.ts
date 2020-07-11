import Profile from '../../profile/profile.entity';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export default CreateUserDto;
