import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Product } from "./product";
import { HttpErrorService } from "../utilities/http-error.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl = "api/products";

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  getproducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getproduct(id: number): Observable<Product> {
    const productUrl = this.productsUrl + "/" + id;
    return this.http
      .get<Product>(productUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(err: any): Observable<never> {
    const errorMessage = this.errorService.formatError(err);
    return throwError(() => errorMessage);
  }
}
