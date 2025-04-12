import { Component, computed, inject, Input, signal } from "@angular/core";
import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CartItem } from "../cart";
import { CartService } from "../cart.service";

@Component({
  selector: "sw-cart-item",
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: "./cart-item.component.html",
})
export class CartItemComponent {
  @Input({ required: true }) set cartItem(ci: CartItem) {
    this.item.set(ci);
  }

  private cartService = inject(CartService);

  item = signal<CartItem>(undefined!);

  qtyArr = [...Array(8).keys()].map((x) => x + 1);

  exPrice = computed(() => this.item().quantity * this.item().product.price);

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.item());
  }
}
