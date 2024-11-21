# TypeORM demo

## 运行步骤:

1. 创建一个 postgresSQL 容器

```bash
docker run -v "$PWD/pot-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

2. postgresSQL 容器中创建数据库

```bash
docker exec -it <containerId> bash

psql -U admin

CREATE DATABASE pot_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

3. 安装依赖

```bash
yarn
```

4. 启动

```bash
yarn dev
```

## 项目说明

### 1、技术栈

Next.js + TypeORM + PostgresSQL + mobx-state-tree + antd

### 2、关联关系

有四张表 `users` \ `authors` \ `blogs` \ `comments`

#### 2.1 OneToOne

user <=> author

- 关系：`author` 是关系所有方，`@JoinColumn()` 可自动写入 `userId`

- 删除：未设置级联删除，删除有 `author` 的 `user` ，会有错误提示

#### 2.2 OneToMany / ManyToOne

blog => comment OneToMany

comment => blog ManyToOne

- 关系：`comment` 是关系所有方，`@JoinColumn()` 可自动写入 `blogId`

- 删除 `blog`，也会删除相关的 `comments`

#### 2.3 ManyToMany

blog <=> author

- 关系：`author` 是关系的所有方

- 数据：会创建 `blogs_authors_authors` table

### 3、增删改查

主要使用 `connection.manager` api 完成

- 储存 `connection.manager.save(author)`

- 删除 `connection.manager.remove(blog)`

- 更新 `connection.manager.save(author)`

- 查找

```js
let blogs = await connection.manager.find(Blog, {
  relations: ['authors', 'comments'],
  where: { id: req.query.id },
})
```

### 4、监听订阅

#### 4.1 监听

`blog.commentCount` 实际未存入数据库，而是在每次加载完毕 `Blog` 后进行的计算的

```jsx
@AfterLoad()
updateCount() {
  this.commentCount = this.comments?.length || 0
}
```

#### 4.2 订阅

`subscriber` 在相应的生命钩子中被调用，可使用 `yarn t:subscriber` 测试

```js
afterLoad(entity: Blog, event?: LoadEvent<Blog>) {
  console.log('---------------- blog subscriber ----------------')
  console.log(`Blog [id:${entity.id}, title:${entity.title}] 被加载啦！！！`)
  console.log('---------------- blog subscriber ----------------')
}
```

### 5、迁移

描述数据库升级与降级操作

`typeorm migration:run` 执行迁移

`typeorm migration:revert` 撤销迁移
