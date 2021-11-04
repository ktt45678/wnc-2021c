import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { Category, Paginated } from '../../../../core/models';
import { destroyCategories, findAllCategories } from '../../../../core/store/category';
import { ViewCategoryComponent } from '../../dialogs/view-category/view-category.component';
import { CreateCategoryComponent } from '../../dialogs/create-category/create-category.component';
import { UpdateCategoryComponent } from '../../dialogs/update-category/update-category.component';
import { RemoveCategoryComponent } from '../../dialogs/remove-category/remove-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DestroyService]
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  StoreStatus = StoreStatus;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

  displayedColumns: string[] = ['_id', 'name', 'subName', 'createdAt', 'products', 'actions'];
  categoryDataSource?: MatTableDataSource<Category>;
  totalCategories?: number;
  defaultSort: Sort = { active: '_id', direction: 'asc' };

  categoryList$: Observable<Paginated<Category>>;
  createCategoryStatus$: Observable<StoreStatus>;
  updateCategoryStatus$: Observable<StoreStatus>;
  removeCategoryStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private destroyService: DestroyService) {
    this.categoryList$ = store.select(state => state.category.categoryList);
    this.createCategoryStatus$ = store.select(state => state.category.createCategoryStatus);
    this.updateCategoryStatus$ = store.select(state => state.category.updateCategoryStatus);
    this.removeCategoryStatus$ = store.select(state => state.category.removeCategoryStatus);
    this.categoryList$.pipe(takeUntil(this.destroyService)).subscribe(paginatedCategory => {
      this.initializeData(paginatedCategory.results);
      this.totalCategories = paginatedCategory.totalResults;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadCategories();
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => this.paginator.pageIndex = 0));
    const sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));
    const createCategorySuccess$ = this.createCategoryStatus$.pipe(filter(status => status === StoreStatus.SUCCESS));
    const updateCategorySuccess$ = this.updateCategoryStatus$.pipe(filter(status => status === StoreStatus.SUCCESS));
    const removeCategorySuccess$ = this.removeCategoryStatus$.pipe(filter(status => status === StoreStatus.SUCCESS));
    merge(search$, sort$, this.paginator.page, createCategorySuccess$, updateCategorySuccess$, removeCategorySuccess$).pipe(
      tap(() => this.loadCategories()),
      takeUntil(this.destroyService)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyCategories());
  }

  private loadCategories(): void {
    this.store.dispatch(findAllCategories({
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
      search: this.searchInput.nativeElement.value || null,
      sort: `${this.sort.direction}(${this.sort.active})`
    }));
  }

  private initializeData(categories: Category[]): void {
    this.categoryDataSource = new MatTableDataSource(categories);
  }

  viewCategoryDialog(category: Category) {
    this.dialog.open(ViewCategoryComponent, {
      width: '450px',
      data: category
    });
  }

  createCategoryDialog() {
    this.dialog.open(CreateCategoryComponent, {
      width: '450px'
    });
  }

  updateCategoryDialog(category: Category) {
    this.dialog.open(UpdateCategoryComponent, {
      width: '450px',
      data: category
    });
  }

  removeCategoryDialog(category: Category) {
    this.dialog.open(RemoveCategoryComponent, {
      width: '450px',
      data: category
    });
  }

}
