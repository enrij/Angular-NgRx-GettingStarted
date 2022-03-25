import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

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

  ngOnInit(): void {

    this.store.dispatch(ProductPageActions.loadProducts());

    this.products$ = this.store
                         .select(getProducts);

    this.selectedProduct$ = this.store
                                .select(getCurrentProduct);

    this.displayCode$ = this.store
                            .select(getShowProductCode);

    this.errorMessage$ = this.store
                             .select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({currentProductId: product.id}));
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteProduct({productId: product.id}));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }
  }

  saveProduct(product: Product): void {
    if (product.id === 0) {
      this.store.dispatch(ProductPageActions.createProduct({product}));
    } else {
      this.store.dispatch(ProductPageActions.updateProduct({product}));
    }
  }
}
