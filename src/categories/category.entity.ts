import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Movie from '../movies/movie.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.categories)
  public movies: Movie[];
}

export default Category;
