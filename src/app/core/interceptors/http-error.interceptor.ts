import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status) {
        const detail = error.error.message || 'Không xác định';
        switch (error.status) {
          default:
            this.snackBar.open(`Lỗi: ${detail}`, 'Đóng', { duration: 10000 });
            break;
        }
      }
      else if (!navigator.onLine) {
        this.snackBar.open('Bạn đang ngoại tuyến, vui lòng kiểm tra kết nối và thử lại', 'Đóng', { duration: 10000 });
      } else {
        this.snackBar.open('Đã xảy ra lỗi kết nối', 'Đóng', { duration: 10000 });
      }
      return throwError(error);
    }));
  }
}
