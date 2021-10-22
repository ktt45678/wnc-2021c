import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  findAll(page?: number, limit?: number, search?: string, sort?: string) {
    return this.http.get<Paginated<User>>('users', {
      params: {
        page: page || 1,
        limit: limit || 30,
        search: search || '',
        sort: sort || 'asc(id)'
      }
    });
  }
}
