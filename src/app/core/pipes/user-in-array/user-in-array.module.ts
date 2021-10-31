import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInArrayPipe } from './user-in-array.pipe';

@NgModule({
  declarations: [UserInArrayPipe],
  imports: [CommonModule],
  exports: [UserInArrayPipe]
})
export class UserInArrayModule { }
