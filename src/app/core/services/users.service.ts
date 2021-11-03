import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Jwt, Paginated, User } from '../models';

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

  findOne(id: number) {
    return this.http.get<User>(`users/${id}`);
  }

  update(id: number, fullName?: string, email?: string, birthdate?: Date, address?: string, currentPassword?: string, password?: string, requestUpgrade?: boolean, upgrade?: boolean, downgrade?: boolean, banned?: boolean) {
    return this.http.patch<User & Partial<Jwt>>(`users/${id}`, { fullName, email, birthdate, address, currentPassword, password, requestUpgrade, upgrade, downgrade, banned }).pipe(map(user => {
      if (user.accessToken)
        localStorage.setItem('accessToken', user.accessToken)
      if (user.refreshToken)
        localStorage.setItem('refreshToken', user.refreshToken)
      user.accessToken = undefined;
      user.refreshToken = undefined;
      return user;
    }));
  }

  findCurrent() {
    return this.http.get<User>('users/0');
  }
}
