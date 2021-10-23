import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { Category, Paginated } from '../../../../core/models';
import { destroyCategories, findAllCategories } from '../../../../core/store/category';

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

  displayedColumns: string[] = ['_id', 'name', 'subName', 'createdAt', 'products'];
  categoryDataSource?: MatTableDataSource<Category>;
  totalCategories?: number;
  defaultSort: Sort = { active: '_id', direction: 'asc' };

  paginatedCategories$: Observable<Paginated<Category>>;
  findAllCategoriesStatus$: Observable<StoreStatus>

  constructor(private store: Store<AppState>, private destroyService: DestroyService) {
    this.paginatedCategories$ = store.select(state => state.category.categoryList);
    this.findAllCategoriesStatus$ = store.select(state => state.category.findAllCategoriesStatus);
    this.paginatedCategories$.pipe(takeUntil(this.destroyService)).subscribe(paginatedCategory => {
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
    merge(search$, sort$, this.paginator.page).pipe(
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

  updateCategory(category: Category) {

  }

  removeCategory(category: Category) {

  }

}
