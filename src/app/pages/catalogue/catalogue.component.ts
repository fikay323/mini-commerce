import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly productService = inject(ProductService);
  products = this.productService.products;
  searchTerm = signal('');
  minPrice = signal(0);
  maxPrice = signal(Number.POSITIVE_INFINITY);

  filtered = computed(() => {
    return this.products().filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm().toLowerCase());

      const inPriceRange =
        product.price >= this.minPrice() && product.price <= this.maxPrice();

      return matchesSearch && inPriceRange;
    });
  });

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.title.setTitle('Products Catalogue - Mini-Commerce');
    this.meta.updateTag({ name: 'description', content: 'Browse our wide selection of products at Mini-Commerce. Find the perfect items for your needs.' });
    this.meta.updateTag({ property: 'og:title', content: 'Products Catalogue - Mini-Commerce' });
    this.meta.updateTag({ property: 'og:description', content: 'Discover and shop for a variety of products at Mini-Commerce.' });
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => this.searchTerm.set(value));
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
