import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { findOneCategory } from '../../../../core/store/category';
import { Category } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { StoreStatus } from '../../../../core/enums/store-status.enum';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  StoreStatus = StoreStatus;

  category$: Observable<Category | null>;
  findOneCategoryStatus$: Observable<StoreStatus>;

  constructor(public dialogRef: MatDialogRef<ViewCategoryComponent>, @Inject(MAT_DIALOG_DATA) private category: Category,
    private store: Store<AppState>) {
    this.category$ = store.select(state => state.category.category);
    this.findOneCategoryStatus$ = store.select(state => state.category.findOneCategoryStatus);
  }

  ngOnInit(): void {
    this.store.dispatch(findOneCategory({ id: this.category._id }));
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
