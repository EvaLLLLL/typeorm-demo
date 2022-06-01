import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Comment } from './Comment'
import { Author } from './Author'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('int', { nullable: true })
  age?: number

  @OneToOne(() => Author, author => author.user)
  author: Author

  @OneToMany(() => Comment, comment => comment.blog)
  comments: Comment[]

  constructor(configs: Omit<Partial<User>, 'id'>) {
    Object.assign(this, configs)
  }
}
