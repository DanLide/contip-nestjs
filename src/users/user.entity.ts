import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Profile from '../profile/profile.entity';

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
  profile: Profile;
}

export default User;
