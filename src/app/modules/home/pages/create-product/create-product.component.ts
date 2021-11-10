import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { CategoryGroup } from '../../../../core/models';
import { createProduct } from '../../../../core/store/product';
import { controlGte } from '../../../../core/validators/control-gte.validator';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  providers: [DestroyService]
})
export class CreateProductComponent implements OnInit {
  StoreStatus = StoreStatus;
  createProductForm: FormGroup;
  minExpiry = (new Date()).toISOString().split('.')[0];

  createProductStatus$: Observable<StoreStatus>;
  categoryGroups$: Observable<CategoryGroup[]>;

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar, private destroyService: DestroyService) {
    this.createProductForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100_000)]),
      category: new FormControl(null, [Validators.required]),
      startingPrice: new FormControl(null, [Validators.required, Validators.min(1_000), Validators.max(100_000_000_000)]),
      priceStep: new FormControl(null, [Validators.required, Validators.min(1_000), Validators.max(100_000_000_000)]),
      buyPrice: new FormControl(null, [Validators.min(1_000), Validators.max(100_000_000_000)]),
      autoRenew: new FormControl(false, [Validators.required]),
      expiry: new FormControl('', [Validators.required]),
      imageInput: new FormControl('', [Validators.required]),
      images: new FormControl([], [Validators.required])
    }, {
      validators: controlGte('buyPrice', 'startingPrice')
    });
    this.createProductStatus$ = store.select(state => state.product.createProductStatus);
    this.categoryGroups$ = store.select(state => state.category.categoryGroups);
  }

  ngOnInit(): void {
    this.createProductStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      if (status === StoreStatus.SUCCESS) {
        this.createProductForm.reset();
        this.createProductForm.patchValue({
          autoRenew: false,
          images: []
        });
      }
    });
  }

  onCreateProductSubmit(): void {
    if (this.createProductForm.invalid)
      return;
    if (Array.isArray(this.createProductForm.value.images) && this.createProductForm.value.images.length < 3) {
      this.snackBar.open('Hãy chọn ít nhất 3 ảnh', 'Đóng', { duration: 10000 });
      return;
    }
    this.store.dispatch(createProduct(this.createProductForm.value));
  }

  onFileChange(event: Event) {
    if (event.target) {
      const target = <HTMLInputElement>event.target;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.size > 8388608) {
          this.snackBar.open('Vui lòng chọn hình ảnh nhỏ hơn 8MB', 'Đóng', { duration: 10000 });
          return;
        }
        if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
          this.snackBar.open('Hình ảnh không được hỗ trợ', 'Đóng', { duration: 10000 });
          return;
        }
        if (Array.isArray(this.createProductForm.value.images) && this.createProductForm.value.images.length >= 30) {
          this.snackBar.open('Đã vượt quá số lượng ảnh cho phép', 'Đóng', { duration: 10000 });
          return;
        }
        this.createProductForm.patchValue({
          images: [...this.createProductForm.value.images, target.files[0]]
        });
      }
    }
  }

  trackId(index: number, item: any) {
    return item?._id || null;
  }

}
