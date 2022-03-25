import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService
                         .getProducts()
                         .pipe(
                           map((products: Product[]) => ProductActions.loadProductsSuccess({products}))
                         )
      ),
      catchError((error: any) => of(ProductActions.loadProductFailure({error})))
    )
  );

  updateProduct$ = createEffect(() => {
    return this.actions$
               .pipe(
                 ofType(ProductActions.updateProduct),
                 concatMap((action: { product: Product }) =>
                   this.productService
                       .updateProduct(action.product)
                       .pipe(
                         map((product: Product) => ProductActions.updateProductSuccess({product})),
                         catchError((error: any) => of(ProductActions.updateProductFailure({error})))
                       ))
               );
  });

  createProduct$ = createEffect(() => {
    return this.actions$
               .pipe(
                 ofType(ProductActions.createProduct),
                 concatMap((action: { product: Product }) =>
                   this.productService
                       .createProduct(action.product)
                       .pipe(
                         map((product: Product) => ProductActions.createProductSuccess({product})),
                         catchError((error: any) => of(ProductActions.createProductFailure({error})))
                       ))
               );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$
               .pipe(
                 ofType(ProductActions.deleteProduct),
                 mergeMap((action: { productId: number }) =>
                   this.productService.deleteProduct(action.productId).pipe(
                     map(() => ProductActions.deleteProductSuccess({productId: action.productId})),
                     catchError(error => of(ProductActions.deleteProductFailure({error})))
                   )
                 )
               );
  });

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
  }
}
