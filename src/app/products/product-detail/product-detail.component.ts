import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";

import { NgIf, NgFor, CurrencyPipe } from "@angular/common";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { catchError, EMPTY, Subscription, tap } from "rxjs";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  @Input() productId: number = 0;
  errorMessage = "";
  sub!: Subscription;

  private productService = inject(ProductService);

  product: Product | null = null;

  pageTitle = this.product
    ? `Product Detail for: ${this.product.productName}`
    : "Product Detail";

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes["productId"].currentValue;
    if (id) {
      this.sub = this.productService
        .getproduct(id)
        .pipe(
          tap((product) => (this.product = product)),
          catchError((err) => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  addToCart(product: Product) {}
}
