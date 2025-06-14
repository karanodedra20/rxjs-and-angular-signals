import { Component, inject } from "@angular/core";

import { NgIf, NgFor, NgClass } from "@angular/common";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductService } from "../product.service";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  pageTitle = "Products";

  private productService = inject(ProductService);

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  selectedProductId = this.productService.selectedProductId;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
