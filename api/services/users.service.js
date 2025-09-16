const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.database.mongodbObjectId(),
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users[index] = {
      ...this.users[index],
      ...changes
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return {id};
  }
}

module.exports = UsersService;
