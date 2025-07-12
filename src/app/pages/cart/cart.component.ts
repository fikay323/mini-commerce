import { Component, inject } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  
  private readonly cartService = inject(CartService);

  items = this.cartService.items;
  total = this.cartService.total;

  updateQty(item: CartItem, event?: Event) {
    const qty = +(event?.target as HTMLInputElement)?.value;
    if(!qty) return;
    const quantity = Math.max(1, qty);
    this.cartService.updateQuantity(item.id, quantity);
  }

  remove(id: number) {
    this.cartService.remove(id);
  }
}
