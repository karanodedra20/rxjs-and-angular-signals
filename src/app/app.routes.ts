import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./utilities/page-not-found.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { HomeComponent } from "./home/home.component";
import { CartShellComponent } from "./cart/cart-shell/cart-shell.component";

export const routes: Routes = [
  { path: "welcome", component: HomeComponent },
  {
    path: "products",
    loadComponent: () =>
      import("./products/product-list/product-list.component").then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: "cart",
    loadComponent: () =>
      import("./cart/cart-shell/cart-shell.component").then(
        (m) => m.CartShellComponent
      ),
  },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];
