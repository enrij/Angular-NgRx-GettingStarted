import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions';
import { getCurrentProduct, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    // TODO: Unsubscribe
    this.store.select(getCurrentProduct).subscribe(
      (currentProduct: Product) => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any): any => this.errorMessage = err
    });

    // TODO: Unsubscribe
    this.store
        .select(getShowProductCode)
        .subscribe((showProductCode: boolean) => {
          this.displayCode = showProductCode;
        });
  }

  checkChanged() {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct() {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product) {
    this.store.dispatch(ProductActions.setCurrentProduct({product}));
  }

}
