import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Movie {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public imdb: number;

  @Column()
  public tmdb: number;
}

export default Movie;
