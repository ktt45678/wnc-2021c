import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar, private zone: NgZone,) { }

  handleError(error: Error) {
    console.error(error);
    this.zone.run(() => this.snackBar.open('Đã có lỗi xảy ra', 'Đóng', { duration: 10000 }));
  }
}
