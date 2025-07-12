import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  items = this.cartService.items;
  total = this.cartService.total;

  placeOrder() {
    const orderId = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
    localStorage.setItem('lastOrderId', orderId);

    this.cartService.clear();
    this.router.navigate(['/success']);
  }

}
