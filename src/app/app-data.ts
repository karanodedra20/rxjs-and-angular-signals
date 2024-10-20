import { InMemoryDbService } from "angular-in-memory-web-api";
import { Product } from "./products/product";
import { Review } from "./reviews/review";
import { ProductData } from "./products/product-data";
import { ReviewData } from "./reviews/review-data";

export class AppData implements InMemoryDbService {
  createDb(): { products: Product[]; reviews: Review[] } {
    const products = ProductData.products;
    const reviews = ReviewData.reviews;
    return { products, reviews };
  }
}
