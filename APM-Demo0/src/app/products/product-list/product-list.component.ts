import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../product';
import * as ProductActions from '../state/product.actions';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode$: Observable<boolean>;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;

  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {

    this.store.dispatch(ProductActions.loadProducts());

    this.products$ = this.store
                         .select(getProducts);

    this.selectedProduct$ = this.store
                                .select(getCurrentProduct);

    this.displayCode$ = this.store
                            .select(getShowProductCode);

    this.errorMessage$ = this.store
                             .select(getError);
  }

  checkChanged() {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct() {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product) {
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId: product.id}));
  }

}
