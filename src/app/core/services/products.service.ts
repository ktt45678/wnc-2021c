import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  create(name: string, description: string, category: number, startingPrice: number, priceStep: number, autoRenew: boolean, expiry: Date, images: File[], buyPrice?: number) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category.toString());
    formData.append('startingPrice', startingPrice.toString());
    formData.append('priceStep', priceStep.toString());
    formData.append('autoRenew', autoRenew.toString());
    formData.append('expiry', expiry.toString());
    images.forEach(image => {
      formData.append('images', image);
    });
    buyPrice != undefined && formData.append('buyPrice', buyPrice.toString());
    return this.http.post<Product>('products', formData);
  }

  findAll(page?: number, limit?: number, search?: string, sort?: string, category?: number, ended?: boolean, seller?: number, winner?: number) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    search && (params.search = search);
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
