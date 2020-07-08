import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Movie from '../movies/movie.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.categories)
  public movies: Movie[];
}

export default Category;
