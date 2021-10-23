import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  findAll(page?: number, limit?: number, search?: string, sort?: string, filter?: number) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    search != null && (params.search = search);
    sort != null && (params.sort = sort);
    filter != null && (params.filter = filter);
    return this.http.get<Paginated<User>>('users', { params });
  }
}
