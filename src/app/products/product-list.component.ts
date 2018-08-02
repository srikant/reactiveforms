import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    listFilter: string;
    errorMessage: string;

  products: IProduct[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
        (products: IProduct[]) => {
            this.products = products;
        },
        (error: any) => this.errorMessage = <any>error
    );
}

toggleImage(): void {
  this.showImage = !this.showImage;
}

onRatingClicked(message: string): void {
  this.pageTitle = 'Product List: ' + message;
}
}
