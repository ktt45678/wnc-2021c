import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';

import { AppState } from '../../../../core/store';
import { Paginated, User } from '../../../../core/models';
import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { destroyUsers, findAllUsers, updateUser } from '../../../../core/store/user';
import { UpdateUserComponent } from '../../dialogs/update-user/update-user.component';
import { ViewUserComponent } from '../../dialogs/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DestroyService]
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
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

  user$: Observable<User | null>;
  paginatedUsers$: Observable<Paginated<User>>;
  findAllUsersStatus$: Observable<StoreStatus>;
  updateUserStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private destroyService: DestroyService) {
    this.user$ = store.select(state => state.auth.user);
    this.paginatedUsers$ = store.select(state => state.user.userList);
    this.findAllUsersStatus$ = store.select(state => state.user.findAllUsersStatus);
    this.updateUserStatus$ = store.select(state => state.user.updateUserStatus);
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
    const select$ = this.typeSelect.selectionChange.pipe(distinctUntilChanged(), tap(() => this.paginator.pageIndex = 0));
    const sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));
    const updateUserSuccess$ = this.updateUserStatus$.pipe(filter(status => status === StoreStatus.SUCCESS));
    merge(search$, select$, sort$, this.paginator.page, updateUserSuccess$).pipe(
      tap(() => this.loadUsers()),
      takeUntil(this.destroyService)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyUsers());
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

  viewUserDialog(user: User): void {
    this.dialog.open(ViewUserComponent, {
      width: '450px',
      data: user
    });
  }

  upgradeUser(user: User): void {
    this.store.dispatch(updateUser({
      id: user._id,
      upgrade: true
    }));
  }

  cancelUpgradeUser(user: User): void {
    this.store.dispatch(updateUser({
      id: user._id,
      upgrade: false
    }));
  }

  downgradeUser(user: User): void {
    this.store.dispatch(updateUser({
      id: user._id,
      downgrade: true
    }));
  }

  updateUserDialog(user: User): void {
    this.dialog.open(UpdateUserComponent, {
      width: '450px',
      data: user
    });
  }

}
