import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  items = this.cartService.items;
  total = this.cartService.total;

  ngOnInit(): void {
    this.title.setTitle('Checkout - Mini-Commerce Shop');
    this.meta.updateTag({ name: 'description', content: 'Complete your purchase at Mini-Commerce. Review your order and proceed to payment.' });
    this.meta.updateTag({ property: 'og:title', content: 'Checkout - Mini-Commerce Shop' });
    this.meta.updateTag({ property: 'og:description', content: 'Finalize your order and make a secure payment at Mini-Commerce.' });
  }

  placeOrder() {
    const orderId = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
    localStorage.setItem('lastOrderId', orderId);

    this.cartService.clear();
    this.router.navigate(['/success']);
  }

}
