import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Blog } from './Blog'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  post_id: number

  @Column('text')
  content: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToOne(() => Blog)
  @JoinColumn()
  blog: Blog
}
