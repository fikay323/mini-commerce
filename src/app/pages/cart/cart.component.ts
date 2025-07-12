import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly cartService = inject(CartService);

  items = this.cartService.items;
  total = this.cartService.total;

  ngOnInit(): void {
    this.title.setTitle('Your Shopping Cart - Mini-Commerce');
    this.meta.updateTag({
      name: 'description',
      content:
        'Review your selected products and proceed to checkout at Mini-Commerce.',
    });
  }

  updateQty(item: CartItem, event?: Event) {
    const qty = +(event?.target as HTMLInputElement)?.value;
    if (!qty) return;
    const quantity = Math.max(1, qty);
    this.cartService.updateQuantity(item.id, quantity);
  }

  remove(id: number) {
    this.cartService.remove(id);
  }
}
