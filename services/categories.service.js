const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
    }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.department(),
      });
    }
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    const category = this.categories.find(category => category.id === id);
    if (!category){
      throw boom.notFound('Category not found');
    }
    return category;
  }

  create(data) {
    const newCategory = {
      id: faker.database.mongodbObjectId(),
      ...data
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id, changes){
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories[index] = {
      ...this.categories[index],
      ...changes
    };
    return this.categories[index];
  }

  delete(id){
    const index = this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return {id};
  }
}

module.exports = CategoriesService;
