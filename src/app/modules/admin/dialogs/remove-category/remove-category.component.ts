import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Category } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { removeCategory } from '../../../../core/store/category';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemoveCategoryComponent>, @Inject(MAT_DIALOG_DATA) private category: Category,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onRemove(): void {
    this.store.dispatch(removeCategory({ id: this.category._id }));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
