import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Blog } from './Blog'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  content: string

  @ManyToOne(() => User)
  @JoinColumn()
  user: User

  @ManyToOne(() => Blog)
  @JoinColumn()
  blog: Blog
}
