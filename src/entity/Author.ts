import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @OneToOne(() => User, user => user.author)
  @JoinColumn()
  user: User

  @ManyToMany(() => Blog, blog => blog.authors)
  @JoinTable()
  blogs: Blog[]

  constructor(configs: Partial<Omit<Author, 'id'>>) {
    Object.assign(this, configs)
  }
}
