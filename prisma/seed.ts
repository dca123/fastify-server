import { faker } from '@faker-js/faker'
import { db } from '../db'



const seed = async () => {
  const users = []
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
    })
  }

  await db.user.createMany({
    data: users,
  })
}

seed()