import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  addProducts(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodprice: number,
  ): any {
    const generatedID = this.ProductsService.insertProduct(
      prodTitle,
      prodDesc,
      prodprice,
    );
    return { id: generatedID };
  }
  @Get()
  getAllProducts() {
    return this.ProductsService.getProducts();
  }
}
