import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Blog } from './Blog'
import { User } from './User'

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column({ nullable: true, type: 'int' })
  userId: number

  @OneToOne(() => User, user => user.author)
  @JoinColumn()
  user: User

  @ManyToMany(() => Blog, blog => blog.authors)
  blogs: Blog[]

  constructor(configs: Partial<Omit<Author, 'id'>>) {
    Object.assign(this, configs)
  }
}
