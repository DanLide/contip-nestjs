import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from '../categories/category.entity';
import Rating from '../ratings/rating.entity';

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

  @OneToMany(() => Rating, (rating: Rating) => rating.movie)
  public ratings: Rating[];
}

export default Movie;
