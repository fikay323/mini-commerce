import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastService = inject(ToastService);
  private readonly renderer = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);

  product?: Product;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.productService.getProductBySlug(slug);
      if (found) {
        this.product = found;
        this.title.setTitle(this.product.name);
        this.meta.updateTag({ name: 'description', content: this.product.description });
        this.meta.updateTag({ property: 'og:title', content: this.product.name });
        this.meta.updateTag({ property: 'og:description', content: this.product.description });
        this.meta.updateTag({ property: 'og:image', content: this.product.image });
      } else {
        this.router.navigate(['/']);
      }
    }

    const productJsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": `${ this.product?.name ?? '' }`,
      "image": `${ this.product?.image ?? '' }`,
      "description": `${ this.product?.description ?? '' }`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": `${ this.product?.price ?? '' }`,
        "availability": "https://schema.org/InStock"
      }
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productJsonLd);

    this.renderer.appendChild(this.document.head, script);
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
