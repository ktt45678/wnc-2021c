import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICreateCategory } from 'src/app/core/interfaces/categories';

import { Category } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { updateCategory } from '../../../../core/store/category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateCategoryComponent>, @Inject(MAT_DIALOG_DATA) private category: Category,
    private store: Store<AppState>) {
    this.updateCategoryForm = new FormGroup({
      name: new FormControl(this.category.name, [Validators.required, Validators.maxLength(32)]),
      subName: new FormControl(this.category.subName, [Validators.required, Validators.maxLength(32)])
    })
  }

  ngOnInit(): void {
  }

  onUpdate(): void {
    if (this.updateCategoryForm.invalid)
      return;
    this.store.dispatch(updateCategory({ id: this.category._id, ...this.updateCategoryForm.value }));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
