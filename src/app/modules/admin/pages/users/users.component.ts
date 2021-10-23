import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { AppState } from '../../../../core/store';
import { Paginated, User } from '../../../../core/models';
import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { findAllUsers } from 'src/app/core/store/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DestroyService]
})
export class UsersComponent implements OnInit, AfterViewInit {
  StoreStatus = StoreStatus;
  Role = Role;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSelect) typeSelect!: MatSelect;
  @ViewChild('searchInput') searchInput!: ElementRef;

  displayedColumns: string[] = ['_id', 'email', 'fullName', 'birthdate', 'role', 'point', 'actions'];
  userDataSource?: MatTableDataSource<User>;
  totalUsers?: number;
  defaultSort: Sort = { active: '_id', direction: 'asc' };

  paginatedUsers$: Observable<Paginated<User>>;
  findAllUsersStatus$: Observable<StoreStatus>

  constructor(private store: Store<AppState>, private destroyService: DestroyService) {
    this.paginatedUsers$ = store.select(state => state.user.userList);
    this.findAllUsersStatus$ = store.select(state => state.user.findAllUsersStatus);
    this.paginatedUsers$.pipe(takeUntil(this.destroyService)).subscribe(paginatedUser => {
      this.initializeData(paginatedUser.results);
      this.totalUsers = paginatedUser.totalResults;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadUsers();
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => this.paginator.pageIndex = 0));
    const select$ = this.typeSelect.selectionChange.pipe(tap(() => this.paginator.pageIndex = 0));
    const sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));
    merge(search$, select$, sort$, this.paginator.page).pipe(
      tap(() => this.loadUsers()),
      takeUntil(this.destroyService)
    ).subscribe();
  }

  private loadUsers(): void {
    this.store.dispatch(findAllUsers({
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
      search: this.searchInput.nativeElement.value || null,
      sort: `${this.sort.direction}(${this.sort.active})`,
      filter: +this.typeSelect.value
    }));
  }

  private initializeData(users: User[]): void {
    this.userDataSource = new MatTableDataSource(users);
  }

  upgradeUser(user: User): void {

  }

  downgradeUser(user: User): void {

  }

}
