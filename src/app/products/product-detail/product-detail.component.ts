import { Component, inject } from "@angular/core";

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from "@angular/common";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { catchError, EMPTY } from "rxjs";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent {
  errorMessage = "";

  private productService = inject(ProductService);

  product$ = this.productService.product$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle = "Product Detail";

  addToCart(product: Product) {}
}
