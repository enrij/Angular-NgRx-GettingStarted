import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (currentProduct: Product) => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any): any => this.errorMessage = err
    });

    this.store
        .select(getShowProductCode)
        .subscribe((showProductCode: boolean) => {
          this.displayCode = showProductCode;
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkChanged() {
    this.store.dispatch({type: '[Product] Toggle product code'});
  }

  newProduct() {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product) {
    this.productService.changeSelectedProduct(product);
  }

}
