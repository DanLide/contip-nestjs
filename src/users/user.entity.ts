import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Profile from '../profile/profile.entity';
import Rating from '../ratings/rating.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @OneToOne(() => Profile, (profile: Profile) => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  public profile: Profile;
}

export default User;
