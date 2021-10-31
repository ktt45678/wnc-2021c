import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() productList: Product[] = [];
  @Input() minimal: boolean = false;
  @Input() transparent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  trackProduct(index: number, item: any) {
    return item?._id || null;
  }

}
