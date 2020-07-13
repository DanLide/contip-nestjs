import User from '../../users/user.entity';
import Category from '../../categories/category.entity';
import Movie from '../../movies/movie.entity';

export class CreateProfileDto {
  user: User;
}

export default CreateProfileDto;
