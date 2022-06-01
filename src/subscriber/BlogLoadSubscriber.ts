import { EventSubscriber, EntitySubscriberInterface } from 'typeorm'
import { Blog } from '../entity/Blog'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'

@EventSubscriber()
export class BlogLoadSubscriber implements EntitySubscriberInterface<Blog> {
  listenTo() {
    return Blog
  }

  afterLoad(entity: Blog, event?: LoadEvent<Blog>) {
    console.log('---------------- blog subscriber ----------------')
    console.log(`Blog [id:${entity.id}, title:${entity.title}] 被加载啦！！！`)
    console.log('---------------- blog subscriber ----------------')
  }
}
