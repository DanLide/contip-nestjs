import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
import Movie from '../movies/movie.entity';

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user: User) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToMany(() => Category, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  preferences: Category[];

  @ManyToMany(() => Movie, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  watchlist: Movie[];
}

export default Profile;
