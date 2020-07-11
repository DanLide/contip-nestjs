import User from '../../users/user.entity';
import Category from '../../categories/category.entity';
import Movie from '../../movies/movie.entity';

export class UpdateProfileDto {
  preferences: Category[];
  watchlist: Movie[];
}

export default UpdateProfileDto;
