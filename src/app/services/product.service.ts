import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Subject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  private readonly PRODUCTS_KEY = 'mini-products';
  private readonly _products = signal<Product[]>([]);
  private readonly destroy$ = new Subject<void>();

  products = computed(() => this._products());

  constructor(private readonly http: HttpClient) { 
    const cached = localStorage.getItem(this.PRODUCTS_KEY);
    if(cached) {
      this._products.set(JSON.parse(cached));
    } else {
      this.fetchProducts();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchProducts() {
    this.http.get<Product[]>('/assets/products.json')
      .pipe(
        take(1),
        tap(products => {
          this._products.set(products);
          localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
        })
      )
      .subscribe();
  }

  getProductBySlug(slug: string): Product | undefined {
    return this._products().find(p => p.slug === slug);
  }
}
