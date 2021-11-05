import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-bid',
  templateUrl: './confirm-bid.component.html',
  styleUrls: ['./confirm-bid.component.scss']
})
export class ConfirmBidComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmBidComponent>) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
