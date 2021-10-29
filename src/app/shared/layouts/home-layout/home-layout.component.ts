import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DestroyService } from '../../../core/services/destroy.service';
import { StoreStatus } from '../../../core/enums/store-status.enum';
import { Role } from '../../../core/enums/role.enum';
import { AppState } from '../../../core/store';
import { CategoryGroup, User } from '../../../core/models';
import { destroyCategories, findCategoryGroups } from '../../../core/store/category';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  providers: [DestroyService]
})
export class HomeLayoutComponent implements OnInit, AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;
  Role = Role;

  findCategoryGroupsStatus$: Observable<StoreStatus>;
  categoryGroups$: Observable<CategoryGroup[]>;
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>, private destroyService: DestroyService) {
    this.findCategoryGroupsStatus$ = store.select(state => state.category.findCategoryGroupsStatus);
    this.categoryGroups$ = store.select(state => state.category.categoryGroups);
    this.user$ = store.select(state => state.auth.user);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.store.dispatch(findCategoryGroups())
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyCategories());
  }

  trackCategoryGroup(index: number, item: any) {
    return item?._id || null;
  }

}
