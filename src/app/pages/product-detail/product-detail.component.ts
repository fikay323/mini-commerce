import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastService = inject(ToastService);

  product?: Product;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.productService.getProductBySlug(slug);
      if (found) {
        this.product = found;
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  addToCart(product: Product) {
    this.cartService.add(product);
    this.toastService.show('Added to cart', 'success');
  }

  getCartItem(productId: number) {
    return this.cartService.items().find((i) => i.id === productId);
  }

  increase(product: Product) {
    this.cartService.add(product);
    this.toastService.show('Quantity increased', 'info');
  }

  decrease(productId: number) {
    const item = this.getCartItem(productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
      this.toastService.show('Quantity decreased', 'info');
    } else {
      this.cartService.remove(productId);
      this.toastService.show('Item removed from cart', 'error');
    }
  }
}
