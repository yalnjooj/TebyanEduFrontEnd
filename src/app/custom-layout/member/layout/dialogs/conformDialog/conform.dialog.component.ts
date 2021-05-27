import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'conform-dialog-component',
  templateUrl: './conform.dialog.component.html',
  styleUrls: ['./conform.dialog.component.scss']
})
export class ConformDialogComponent {

  icClose = icClose;
  hint: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConformDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService) {
      this.hint = data.hint
      this.message = data.message
    }

  conform() {
    this.dialogRef.close(true);
  //  this.ngxSpinnerService.hide()  
  }

}
