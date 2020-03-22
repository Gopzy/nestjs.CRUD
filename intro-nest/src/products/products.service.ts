import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private Products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.Products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.Products];
  }
}
