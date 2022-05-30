import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Author } from './Author'
import { Comment } from './Comment'

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  title: string

  @Column('text')
  content: string

  @OneToMany(() => Comment, comment => comment.blog)
  comments: Comment[]

  @ManyToMany(() => Author, author => author.blogs)
  authors: Author[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor(configs: Omit<Partial<Blog>, 'id'>) {
    Object.assign(this, configs)
  }
}
