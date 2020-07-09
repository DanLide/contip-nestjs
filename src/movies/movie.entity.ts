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
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  public categories: Category[];
}

export default Movie;
