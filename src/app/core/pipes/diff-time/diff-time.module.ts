import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiffTimePipe } from './diff-time.pipe';

@NgModule({
  declarations: [DiffTimePipe],
  imports: [CommonModule],
  exports: [DiffTimePipe]
})
export class DiffTimeModule { }
