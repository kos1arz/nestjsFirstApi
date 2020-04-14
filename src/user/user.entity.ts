import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from 'src/tdo/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column({
      unique: true
  })
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
      const { id, created, username, token } = this;
      const responseObject: any = { id, created, username };
      if(showToken) {
        responseObject.token = token;
      }
      return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password)
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
        {
            id,
            username
        },
        process.env.SECRET,
        { expiresIn: '7d' },
    );
  }
}