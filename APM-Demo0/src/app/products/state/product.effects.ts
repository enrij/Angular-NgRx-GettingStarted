import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() => this.productService
                         .getProducts()
                         .pipe(
                           map((products: Product[]) => ProductApiActions.loadProductsSuccess({products}))
                         )
      ),
      catchError((error: any) => of(ProductApiActions.loadProductFailure({error})))
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$
        .pipe(
          ofType(ProductPageActions.updateProduct),
          concatMap((action: { product: Product }) =>
            this.productService
                .updateProduct(action.product)
                .pipe(
                  map((product: Product) => ProductApiActions.updateProductSuccess({product})),
                  catchError((error: any) => of(ProductApiActions.updateProductFailure({error})))
                ))
        ));

  createProduct$ = createEffect(() =>
    this.actions$
        .pipe(
          ofType(ProductPageActions.createProduct),
          concatMap((action: { product: Product }) =>
            this.productService
                .createProduct(action.product)
                .pipe(
                  map((product: Product) => ProductApiActions.createProductSuccess({product})),
                  catchError((error: any) => of(ProductApiActions.createProductFailure({error})))
                ))
        ));

  deleteProduct$ = createEffect(() =>
    this.actions$
        .pipe(
          ofType(ProductPageActions.deleteProduct),
          mergeMap((action: { productId: number }) =>
            this.productService.deleteProduct(action.productId).pipe(
              map(() => ProductApiActions.deleteProductSuccess({productId: action.productId})),
              catchError(error => of(ProductApiActions.deleteProductFailure({error})))
            )
          )
        ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
  }
}
