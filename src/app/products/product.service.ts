import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  throwError,
} from "rxjs";
import { Product } from "./product";
import { HttpErrorService } from "../utilities/http-error.service";
import { ReviewService } from "../reviews/review.service";
import { Review } from "../reviews/review";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl = "api/products";

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    shareReplay(1),
    catchError((err) => this.handleError(err))
  );

  /* Info: It emits every time  when the user selects a product and products$ which emits when the products are loaded.
     The combineLatest does not emit until both observables have emitted at least once.
     That way it won't attempt to find a product in the array before the array has been retrieved.
  */
  product$ = combineLatest([this.products$, this.productSelected$]).pipe(
    map(([products, selectedProductId]) =>
      products.find((product) => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap((product) => this.getProductWithReviews(product)),
    catchError((err) => this.handleError(err))
  );

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews } as Product)));
    } else {
      return of(product);
    }
  }

  private handleError(err: any): Observable<never> {
    const errorMessage = this.errorService.formatError(err);
    return throwError(() => errorMessage);
  }
}
