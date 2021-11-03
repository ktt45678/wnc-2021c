import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Product } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { removeProduct } from '../../../../core/store/product';

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.scss']
})
export class BanUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BanUserComponent>, @Inject(MAT_DIALOG_DATA) private product: Product,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onRemove(): void {
    this.store.dispatch(removeProduct({ id: this.product._id }));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
