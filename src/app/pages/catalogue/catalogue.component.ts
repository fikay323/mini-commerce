import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  private readonly productService = inject(ProductService);
  products = this.productService.products;
}
