import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private Products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.Products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.Products];
  }

  getSingleProduct(productId: string) {
    const product = this.Products.find(prod => prod.id === productId);
    if (!product) {
      throw new NotFoundException('Could not find Product');
    }
    return { ...product };
  }
}
