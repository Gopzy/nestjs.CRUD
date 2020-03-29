import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private Products: Product[] = [];

  insertProduct(title: string, desc: string, date: Date, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, date, price);
    this.Products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.Products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productID: string,
    title: string,
    desc: string,
    date: Date,
    price: number,
  ) {
    const [product, index] = this.findProduct(productID);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (date) {
      updatedProduct.date = date;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.Products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.Products.splice(index, 1)

  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.Products.findIndex(prod => prod.id === productId);
    const product = this.Products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find Product');
    }
    return [product, productIndex];
  }


}
