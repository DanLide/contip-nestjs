import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
import Movie from '../movies/movie.entity';

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: User;

  @ManyToMany(() => Category, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  public preferences: Category[];

  @ManyToMany(() => Movie, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  public watchlist: Movie[];
}

export default Profile;
