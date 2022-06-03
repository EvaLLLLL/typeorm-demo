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

  @Column({ nullable: true, type: 'int' })
  userId: number

  @Column({ nullable: true, type: 'int' })
  blogId: number

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @ManyToOne(() => Blog, blog => blog.comments, { onDelete: 'CASCADE' })
  @JoinColumn()
  blog: Blog

  constructor(content: string) {
    this.content = content
  }
}
