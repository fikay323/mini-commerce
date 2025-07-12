import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
  orderId = '';

  ngOnInit(): void {
    this.orderId = localStorage.getItem('lastOrderId') || '';
  }

}
