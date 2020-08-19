//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  act = {message: 'string', action: 'string'};
  action = {};
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {

    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.switchs(this.action)
  }

  switchs(action) {
    switch (action) {
      case 'Add':
        this.act.message = 'أضف مسمى الدورة الجديد';
        this.act.action = 'إضافة';
        break;
      case 'Update':
        this.act.message = 'تعديل إسم الدورة';
        this.act.action = 'تحديث';
        break;
      case 'Delete':
        this.act.message = 'حذف دورة';
        this.act.action = 'حذف';
        break;
    }
    this.action = this.act;
    console.log(this.action['action'])
  }

  doAction() {
    switch (this.action['action']) {
      case 'إضافة':
        this.act.action = 'Add';
        break;
      case 'تحديث':
        this.act.action = 'Update';
        break;
      case 'حذف':
        this.act.action = 'Delete';
        break;
    }
    
    this.dialogRef.close({ event: this.action['action'], data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}