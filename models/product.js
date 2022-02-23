const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent)); //  parses (break something down into its parts, particularly for study of the individual parts) a JSON string, constructing the JavaScript value or object described by the string
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();  
        products.push(this);    // to use this here use arrow func for func inside readFile
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        })
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatePproducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatePproducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      })
    })
  }

  // static because we can directly call this on a function not on any instantiated object
  static fetchAll(cd) {
    getProductsFromFile(cd);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }
}