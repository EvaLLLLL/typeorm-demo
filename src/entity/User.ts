import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Comment } from './Comment'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('int', { nullable: true })
  age?: number

  @OneToMany(() => Comment, comment => comment.blog)
  comments: Comment[]

  constructor(configs: Omit<Partial<User>, 'id'>) {
    Object.assign(this, configs)
  }
}
