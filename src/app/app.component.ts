import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CartService } from "./cart/cart.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Shoppy Cart";

  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;
}
