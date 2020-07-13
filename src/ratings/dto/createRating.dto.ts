import Movie from '../../movies/movie.entity';
import User from '../../users/user.entity';

export class CreateRatingDto {
  value: number;
  movie: Movie;
}

export default CreateRatingDto;
