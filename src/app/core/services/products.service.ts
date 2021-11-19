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
    formData.append('expiry', (new Date(expiry)).toJSON());
    images.forEach(image => {
      formData.append('images', image);
    });
    buyPrice != undefined && formData.append('buyPrice', buyPrice.toString());
    return this.http.post<Product>('products', formData);
  }

  findAll(page?: number, limit?: number, search?: string, sort?: string, category?: number, ended?: boolean, saleFilter?: number, bidded?: boolean, won?: boolean, favorited?: boolean, except?: number) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    search && (params.search = search);
    sort != null && (params.sort = sort);
    category != null && (params.category = category);
    ended != null && (params.ended = ended);
    saleFilter != null && (params.saleFilter = saleFilter);
    bidded != null && (params.bidded = bidded);
    won != null && (params.won = won);
    favorited != null && (params.favorited = favorited);
    except != null && (params.except = except);
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

  createBid(id: number, price: number) {
    return this.http.post(`products/${id}/bid`, { price });
  }

  bidHint(id: number) {
    return this.http.get(`products/${id}/bid`);
  }

  requestBid(id: number) {
    return this.http.post(`products/${id}/request-bid`, {});
  }

  approveBid(id: number, user: number, accept: boolean) {
    return this.http.post(`products/${id}/approve-bid`, { user, accept });
  }

  denyBid(id: number, user: number) {
    return this.http.post(`products/${id}/deny-bid`, { user });
  }

  createProductRating(id: number, ratingType: number, comment: string) {
    return this.http.post(`products/${id}/rating`, { ratingType, comment });
  }

  addToFavorite(id: number) {
    return this.http.post(`products/${id}/favorite`, {});
  }

  removeFromFavorite(id: number) {
    return this.http.delete(`products/${id}/favorite`);
  }
}
