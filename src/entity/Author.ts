import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Blog } from './Blog'

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @ManyToMany(() => Blog, blog => blog.authors)
  @JoinTable()
  blogs: Blog[]
}
