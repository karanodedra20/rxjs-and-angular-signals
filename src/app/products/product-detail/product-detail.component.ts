import { Component, computed, inject } from "@angular/core";

import { NgIf, NgFor, CurrencyPipe } from "@angular/common";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { CartService } from "../../cart/cart.service";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = this.productService.product;
  errorMessage = this.productService.productError;

  pageTitle = computed(() => {
    const product = this.product();
    return product
      ? `Product Detail for: ${product.productName}`
      : "Product Detail";
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
