import { TestBed } from '@angular/core/testing';
import { CartService, CartItem } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  const CART_KEY = 'mini-cart';

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    price: 1000,
    image: 'test.jpg',
    description: 'Test Description',
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    service.add(mockProduct);
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(mockProduct.id);
    expect(items[0].quantity).toBe(1);
  });

  it('should increase quantity on duplicate product add', () => {
    service.add(mockProduct);
    service.add(mockProduct);
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should update product quantity', () => {
    service.add(mockProduct);
    service.updateQuantity(mockProduct.id, 5);
    expect(service.items()[0].quantity).toBe(5);
  });

  it('should remove a product from the cart', () => {
    service.add(mockProduct);
    service.remove(mockProduct.id);
    expect(service.items().length).toBe(0);
  });

  it('should clear the cart and remove from localStorage', () => {
    service.add(mockProduct);
    service.clear();
    expect(service.items().length).toBe(0);
    expect(localStorage.getItem(CART_KEY)).toBeNull();
  });

  it('should calculate the total correctly', () => {
    service.add(mockProduct);
    service.add(mockProduct);
    expect(service.total()).toBe(2000);
  });

  it('should persist items to localStorage', () => {
    service.add(mockProduct);
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartItem[];
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(mockProduct.id);
  });

  it('should restore cart from localStorage on init', () => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify([{ ...mockProduct, quantity: 3 }])
    );

    const restored = new CartService();
    expect(restored.items()[0].quantity).toBe(3);
  });
});
