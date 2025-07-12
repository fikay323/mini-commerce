import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';


export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'mini-cart';
  private readonly _items = signal<CartItem[]>([]);

  items = computed(() => this._items());
  total = computed(() => this._items().reduce((sum, item) => sum + item.price * item.quantity, 0));

  constructor() {
    const cached = localStorage.getItem(this.CART_KEY);
    if (cached) {
      this._items.set(JSON.parse(cached));
    }
  }

  private persist() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this._items()));
  }

  add(product: Product) {
    const current = this._items();
    const index = current.findIndex(i => i.id === product.id);
    if (index > -1) {
      current[index].quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }
    this._items.set([...current]);
    this.persist();
  }

  updateQuantity(id: number, quantity: number) {
    const updated = this._items().map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    this._items.set(updated);
    this.persist();
  }

  remove(id: number) {
    this._items.set(this._items().filter(i => i.id !== id));
    this.persist();
  }

  clear() {
    this._items.set([]);
    localStorage.removeItem(this.CART_KEY);
  }
}
