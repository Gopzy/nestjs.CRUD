import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly ProductsService: ProductsService) { }

  @Post()
  addProducts(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('date') prodDate: Date,
    @Body('price') prodprice: number,
  ): any {
    const generatedID = this.ProductsService.insertProduct(
      prodTitle,
      prodDesc,
      prodDate,
      prodprice,
    );
    return { id: generatedID };
  }
  @Get()
  getAllProducts() {
    return this.ProductsService.getProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.ProductsService.getSingleProduct(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('date') date: Date,
    @Body('price') prodprice: number,
  ) {
    this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, date, prodprice);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.ProductsService.deleteProduct(prodId);
    return null;
  }

}
