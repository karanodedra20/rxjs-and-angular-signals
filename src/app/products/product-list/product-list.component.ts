import { Component, inject, OnDestroy, OnInit } from "@angular/core";

import { NgIf, NgFor, NgClass } from "@angular/common";
import { Product } from "../product";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductService } from "../product.service";
import { catchError, EMPTY, Subscription, tap } from "rxjs";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage = "";
  sub!: Subscription;

  private productService = inject(ProductService);

  products: Product[] = [];

  selectedProductId: number = 0;

  ngOnInit(): void {
    this.sub = this.productService
      .getproducts()
      .pipe(
        tap((products) => (this.products = products)),
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
