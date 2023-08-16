const { faker } = require('@faker-js/faker');
const Boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url({ width: 300, height: 300 }),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    if (this.products === []) {
      throw Boom.notFound('Product not found');
    }
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw Boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw Boom.conflict('Product is blocked');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw Boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return {
      message: 'Product updated succesfully',
      'updated-body': this.products[index],
    };
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    const product = this.products.find((item) => item.id === id);
    if (index === -1) {
      throw Boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { message: 'Product deleted succesfully', 'deleted-body': product };
  }
}

module.exports = ProductsService;
