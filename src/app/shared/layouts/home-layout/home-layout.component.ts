import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DestroyService } from '../../../core/services/destroy.service';
import { StoreStatus } from '../../../core/enums/store-status.enum';
import { Role } from '../../../core/enums/role.enum';
import { AppState } from '../../../core/store';
import { CategoryGroup, Notification, User } from '../../../core/models';
import { destroyCategories, findCategoryGroups } from '../../../core/store/category';
import { takeUntil, tap } from 'rxjs/operators';
import { IoEvent } from 'src/app/core/enums/io-event.enum';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  providers: [DestroyService]
})
export class HomeLayoutComponent implements OnInit, AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;
  Role = Role;

  notifications: Notification[] = [];
  notificationCount: number | null = null;

  findCategoryGroupsStatus$: Observable<StoreStatus>;
  categoryGroups$: Observable<CategoryGroup[]>;
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>, private socket: Socket, private destroyService: DestroyService) {
    this.findCategoryGroupsStatus$ = store.select(state => state.category.findCategoryGroupsStatus);
    this.categoryGroups$ = store.select(state => state.category.categoryGroups);
    this.user$ = store.select(state => state.auth.user);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.store.dispatch(findCategoryGroups())
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken)
      this.socket.emit(IoEvent.AUTHENTICATE, { accessToken });
    this.socket.fromEvent<Notification>(IoEvent.NOTIFICATION_PRODUCTS).pipe(tap((notification) => {
      this.notifications.unshift(notification);
      if (this.notifications.length > 100)
        this.notifications.pop();
      if (this.notificationCount === null)
        this.notificationCount = 1;
      else if (this.notificationCount < 100)
        this.notificationCount += 1;
      this.playNotificationAudio();
    }), takeUntil(this.destroyService)).subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyCategories());
  }

  trackCategoryGroup(index: number, item: any) {
    return item?._id || null;
  }

  trackDate(index: number, item: any) {
    return item?.createdAt || null;
  }

  playNotificationAudio(): void {
    const audio = new Audio();
    audio.src = '../../../../assets/audio/notification.mp3';
    audio.load();
    audio.play();
  }

}
