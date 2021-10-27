import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  create(name: string, description: string, category: number, startingPrice: number, priceStep: number, autoRenew: boolean, expiry: Date, buyPrice?: number) {
    return this.http.post<Product>('products', { name, description, category, startingPrice, priceStep, autoRenew, expiry, buyPrice });
  }

  findAll(page?: number, limit?: number, search?: string, sort?: string, category?: number, ended?: boolean, seller?: number, winner?: number) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    search != null && (params.search = search);
    sort != null && (params.sort = sort);
    category != null && (params.category = category);
    ended != null && (params.ended = ended);
    seller != null && (params.seller = seller);
    winner != null && (params.winner = winner);
    return this.http.get<Paginated<Product>>('products', { params });
  }

  findOne(id: number) {
    return this.http.get<Product>(`products/${id}`);
  }

  update(id: number, description: string) {
    return this.http.patch<Product>(`products/${id}`, { description });
  }

  remove(id: number) {
    return this.http.delete(`products/${id}`);
  }
}
