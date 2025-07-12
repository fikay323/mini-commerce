import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  private readonly productService = inject(ProductService);
  products = this.productService.products;
  searchTerm = signal('');
  minPrice = signal(0);
  maxPrice = signal(Number.POSITIVE_INFINITY);

  filtered = computed(() => {
    return this.products().filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm().toLowerCase())
        || product.description.toLowerCase().includes(this.searchTerm().toLowerCase());

      const inPriceRange = product.price >= this.minPrice() && product.price <= this.maxPrice();

      return matchesSearch && inPriceRange;
    });
  });

  private readonly destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    fromEvent<Event>(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.searchTerm.set(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMinPriceInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const newMinPrice = Number(inputValue) || 0;
    this.minPrice.set(newMinPrice);
  }

  onMaxPriceInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const newMaxPrice = Number(inputValue) || Number.POSITIVE_INFINITY;
    this.maxPrice.set(newMaxPrice);
  }
}
