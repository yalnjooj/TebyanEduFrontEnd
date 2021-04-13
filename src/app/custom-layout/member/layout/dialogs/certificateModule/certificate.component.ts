import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'certificate-component',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateModule {

  icClose = icClose;
/**
 *<a (click)="formSettings({rowID: element.rowID, certificateName: element.certificateName, langSex: element.langSex, cerPosition: element.cerPosition, textsPosition: element.textsPosition,
  langSexType: element.langSexType, cerPositionType: element.cerPositionType, textsPositionType: element.textsPositionType})"

 */

  constructor(
    private dialogRef: MatDialogRef<CertificateModule>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService) { }

  conform() {
    this.dialogRef.close(true);
  //  this.ngxSpinnerService.hide()  
  }

}
