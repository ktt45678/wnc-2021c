import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { createCategory } from '../../../../core/store/category';
import { AppState } from '../../../../core/store';

@Component({
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, private store: Store<AppState>) {
    this.createCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      subName: new FormControl('', [Validators.required, Validators.maxLength(32)])
    })
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    if (this.createCategoryForm.invalid)
      return;
    this.store.dispatch(createCategory(this.createCategoryForm.value));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
