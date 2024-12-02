import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  catchError,
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

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    shareReplay(1),
    catchError((err) => this.handleError(err))
  );

  getproduct(id: number): Observable<Product> {
    const productUrl = this.productsUrl + "/" + id;
    return this.http.get<Product>(productUrl).pipe(
      switchMap((product) => this.getProductWithReviews(product)),
      catchError((err) => this.handleError(err))
    );
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
