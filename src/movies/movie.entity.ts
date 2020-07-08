import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from '../categories/category.entity';

@Entity()
class Movie {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public imdb: number;

  @Column()
  public tmdb: number;

  @ManyToMany(() => Category, (category: Category) => category.movies, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public categories: Category[];
}

export default Movie;
