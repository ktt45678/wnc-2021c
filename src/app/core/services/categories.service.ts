import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  create(name: string, subName: string) {
    return this.http.post<Category>('categories', { name, subName });
  }

  findAll(page?: number, limit?: number, search?: string, sort?: string) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    search != null && (params.search = search);
    sort != null && (params.sort = sort);
    return this.http.get<Paginated<Category>>('categories', { params });
  }

  findOne(id: number) {
    return this.http.get<Category>(`categories/${id}`);
  }

  update(id: number, name: string, subName: string) {
    return this.http.patch<Category>(`categories/${id}`, { name, subName });
  }

  remove(id: number) {
    return this.http.delete(`categories/${id}`);
  }
}
