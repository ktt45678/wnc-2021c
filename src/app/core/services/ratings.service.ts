import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Paginated, Rating } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  findAll(page?: number, limit?: number, sort?: string, target?: number) {
    const params: any = {};
    page != null && (params.page = page);
    limit != null && (params.limit = limit);
    sort != null && (params.sort = sort);
    target != null && (params.target = target);
    return this.http.get<Paginated<Rating>>('ratings', { params });
  }
}
