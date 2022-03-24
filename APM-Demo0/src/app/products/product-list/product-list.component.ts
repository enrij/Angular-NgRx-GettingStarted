import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (currentProduct: Product): Product => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]): Product[] => this.products = products,
      error: (err: any): any => this.errorMessage = err
    });

    this.store
        .select('products')
        .subscribe((products: any) => this.displayCode = products.showProductCode);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch({type: '[Product] Toggle product code'});
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
