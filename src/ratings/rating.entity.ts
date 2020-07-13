import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Movie from '../movies/movie.entity';
import User from '../users/user.entity';

@Entity()
@Unique(['user', 'movie'])
class Rating {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public value: number;

  @ManyToOne(() => User, (user: User) => user.ratings, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Movie, (movie: Movie) => movie.ratings, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  movie: Movie;
}

export default Rating;
