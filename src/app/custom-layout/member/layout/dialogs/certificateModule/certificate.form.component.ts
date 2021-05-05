import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit, ViewChild, NgZone, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import icClose from '@iconify/icons-ic/twotone-close';
import { Apollo } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Certificate } from 'crypto';

interface Certificates {
  view?: {height: number, width: number},
  tabs?: Array<
    {
      name?: string,
      details?: {
      background?: string,
      components?: 
        {
          images?: Array<{
            img?: string,
            width?: number,
            height?: number,
            x?: number,
            y?: number,
            zIndex?: number
          }>,
        texts?: Array<{
            text?: string,
            width?: number,
            height?: number,
            x?: number,
            y?: number,
            zIndex?: number
          }>
      }
      
    }
  }>
}

@Component({
  selector: 'certificate-component',
  templateUrl: './certificate.form.component.html',
  styleUrls: ['./certificate.form.component.css']
})
export class CertificateFormComponent implements OnInit {

  certificates: Certificates = {view: {height: null, width: null}, tabs: [{ name: null, details: {background: null, components: {images: [{img: null, width: null, height: null, x: null, y: null, zIndex: null}], texts: [{text: null, width: null, height: null, x: null, y: null, zIndex: null}]}}}]}

  bottom: number;
  boxBottom: number;
  bothBottom: number;

  icClose = icClose;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
 *<a (click)="formSettings({rowID: element.rowID, certificateName: element.certificateName, langSex: element.langSex, cerPosition: element.cerPosition, textsPosition: element.textsPosition,
  langSexType: element.langSexType, cerPositionType: element.cerPositionType, textsPositionType: element.textsPositionType})"
 */

  component = {width: null, height: null, bottom: null, right: null};

  @ViewChild('tabs') tabs: any;
  @ViewChild('certificateBox') certificateBox: ElementRef;
  @ViewChildren('resizeBox') resizeBox: QueryList<ElementRef>;

  @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight: ElementRef;
  @ViewChild('dragHandleBottom') dragHandleBottom: ElementRef;


  backgroundPosition: object;

  get childrenComponents(): HTMLElement {
    return this.certificateBox.nativeElement.children;
  }

  get resizeBoxElement(): HTMLElement {
    return
  }

  get dragHandleCornerElement(): HTMLElement {
    return this.dragHandleCorner.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  get dragHandleBottomElement(): HTMLElement {
    return this.dragHandleBottom.nativeElement;
  }
  
  
  constructor(
    private rd: Renderer2,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<CertificateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCertificate: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

    dragPosition
    public onDragDrop(event: HTMLElement) {
      

      this.resizeBox.forEach((div: ElementRef) => {
        // console.log(div)
      });        // console.log(this.resizeBox1)
        // console.log(this.resizeBox)
      }
     ngAfterViewInit() {
    //   // this.width = this.certificates.tabs[0].details.component.image[0].width
    //   // this.height =  this.certificates.tabs[0].details.component.image[0].height
    //   // this.x = this.certificates.tabs[0].details.component.image[0].x
    //   // this.y = this.certificates.tabs[0].details.component.image[0].y

   // this.setAllHandleTransform();

   this.resizeBox.forEach((div: ElementRef) => {
    // console.log(div)
  });

    //   // this.tabs.nativeElement.children.forEach((tab: HTMLElement, index: number) => {
          
    //       this.tabs._elementRef.nativeElement.children[1].children.forEach((tab: any) => {
            
    //       tab.children.forEach(components => {
    //         components.children.forEach((component, index: number) => {
    //         //  console.log(index,index,index,index,index,index)

    //           component.children.forEach((element: HTMLElement) => {

    //               // element.style.transform = `translate(${translateX}px, ${translateY}px)`
    //               this.certificates.tabs[index].details.components.images.forEach(image => {
    //                // console.log(image)
    //               });
    //             });
    //         });
    //       });
    //         // component.children[index].children[0].children.forEach((element: HTMLElement) => {
    //         //     console.log(element)
    //         // });

    //       });
         
    //   // })

    //   // this.certificateBox.nativeElement.children.forEach((component: HTMLElement, index: number) => {

    //   //   
    //   //   this.certificates.tabs[index].details.components.images[index].height
    //   //   this.certificates.tabs[index].details.components.images[index].x
    //   //   this.certificates.tabs[index].details.components.images[index].y



      
    //   // });


    }
  
    setAllHandleTransform(box, corner, left, top) {
      const rect = this.resizeBoxElement.getBoundingClientRect();
      // console.log(rect)
      // this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');
      // this.setHandleTransform(this.dragHandleRightElement, rect, 'x');
      // this.setHandleTransform(this.dragHandleBottomElement, rect, 'y');
    }
  
    setHandleTransform(
      dragHandle: HTMLElement,
      targetRect: ClientRect | DOMRect,
      position: 'x' | 'y' | 'both'
    ) {
      const dragRect = dragHandle.getBoundingClientRect();
      const translateX = targetRect.width - dragRect.width;
      const translateY = targetRect.height - dragRect.height;
  
      if (position === 'x') {
        dragHandle.style.transform = `translate(${translateX}px, 0)`;
      }
  
      if (position === 'y') {
        dragHandle.style.transform = `translate(0, ${translateY}px)`;
      }
  
      if (position === 'both') {
        dragHandle.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    }
  
    dragMove(dragHandle: HTMLElement, resizeBox: HTMLElement) {

      this.ngZone.runOutsideAngular(() => {
        this.resize(dragHandle, resizeBox);
     
      })
    }
  
    resize(dragHandle: HTMLElement, resizeBox: HTMLElement) {
      const dragRect = dragHandle.getBoundingClientRect();
      const resizeBoxRect = resizeBox.getBoundingClientRect();
      console.log('dragRect',dragRect)
      console.log('resizeBoxRect',resizeBoxRect)
      const width = (dragRect.left - resizeBoxRect.left) + dragRect.width;
      const height = (dragRect.top - resizeBoxRect.top) + dragRect.height;
  
       resizeBox.style.width = width + 'px';
       resizeBox.style.height = height + 'px';
      this.bottom = dragRect.top
      this.boxBottom = resizeBoxRect.top
      this.bothBottom = height
     // this.setAllHandleTransform();
    }

ngOnInit(){


  this.apollo.watchQuery({
  query: gql`
      query certificateDetail($uID: Int! $ceID: Int!){
        certificateDetail(uID: $uID ceID: $ceID){
          id
          certificatesDetails
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      uID: Number(this.dataFromCertificate.userID),
      ceID: Number(this.dataFromCertificate.data.rowID)
    }
}).valueChanges.subscribe(( {data}: any ) => {

  if(data.certificateDetail[0] == undefined){
    this.certificates.tabs.shift()
    this.dataFromCertificate.data.langSex.split('-').forEach((name: string, index: number) => {
      
      switch (this.dataFromCertificate.data.cerPositionType) {
        case 'V':
          this.certificates.view = {width: 210, height: 297}
          break;
      
        case 'H':
          this.certificates.view = {width: 297, height: 210}
          break;
      }

      this.certificates.tabs.push({
        name
      })
    
      this.certificates.tabs.forEach(element =>{})

    })
    return
  }

  this.certificates = JSON.parse(data.certificateDetail[0].certificatesDetails)
  this.changePosition(this.certificates.view)

  this.certificates.tabs.forEach(element =>{})
  
})

//console.log(JSON.parse('{"view":70,"tabs":[{"id":0,"name":"مذكر","details":{"background":"images - background","component":{"images":[{"id":0,"img":"imagess - img","width":50,"height":50,"x":50,"y":50,"zIndex":2},{"id":1,"img":"imagess - img","width":200,"height":200,"x":100,"y":100,"zIndex":2}],"texts":[{"id":0,"texts":"texts texts texts","width":200,"height":200,"x":100,"y":100,"zIndex":2}]}}}]}'))
//this.certificates.tabs.shift()
// this.data.langSex.split('-').forEach((name: string, index: number) => {

//   this.certificates.tabs.push({
//     id: index,
//     name
//   })
  
//   switch (Number(this.data.rowID)) {
//     case 7:
      
//       this.certificates.view = fakeData.certificates[0].view
      
//       fakeData.certificates[0].tabs.forEach( (tab, index) =>{
//         this.certificates.tabs[index].name = tab.name
//         this.certificates.tabs[index].details.background = tab.details.background

  
//           tab.details.component.images.forEach((image, index) =>{
//             this.certificates.tabs[index].details.components.images[index].width = image.width
//             this.certificates.tabs[index].details.components.images[index].height = image.height
//             this.certificates.tabs[index].details.components.images[index].x = image.x
//             this.certificates.tabs[index].details.components.images[index].y = image.y
//             this.certificates.tabs[index].details.components.images[index].zIndex = image.zIndex 
//           })
//         })
//       console.log(this.certificates)
//       break;
  
//     case 12:
    
//       console.log(fakeData.certificates[2].view)
  
//       fakeData.certificates[2].tabs.forEach( tab =>{
//           console.log(tab.name)
//           console.log(tab.details.background)
  
//           tab.details.component.images.forEach(image =>{
//             console.log(image.width)
//             console.log(image.height)
//             console.log(image.height)
//             console.log(image.y)
//             console.log(image.zIndex)
  
//           })
//         })
  
//       break;
  
//     case 17:
  
//       console.log(fakeData.certificates[1].view)
  
//       fakeData.certificates[1].tabs.forEach( tab =>{
//           console.log(tab.name)
//           console.log(tab.details.background)
  
//           tab.details.component.images.forEach(image =>{
//             console.log(image.width)
//             console.log(image.height)
//             console.log(image.height)
//             console.log(image.y)
//             console.log(image.zIndex)
  
//           })
//         })
  
//       break;
//   }
  

// })

















}




changePosition(type){

   const PageSite = {
    V: {
     100: {width: 210, height: 297},
     85: {width: 178.5, height: 252.45},
     70: {width: 147, height: 207.9},
     55: {width: 115.5, height: 163.35},
     40: {width: 84, height: 118.8},
     25: {width: 52.5, height: 74.25}
    },
    H: {
      100: {width: 297, height: 210},
      85: {width: 252.45, height: 178.5},
      70: {width: 207.9, height: 147},
      55: {width: 163.35, height: 115.5},
      40: {width: 118.8, height: 84},
      25: {width: 74.25, height: 52.5}
    }
  }
  
  switch (this.dataFromCertificate.data.cerPositionType) {

    case 'V':

      switch (type) {
        case 100:
          this.certificates.view = PageSite.V[type]
          break;
      
        case 85:
          this.certificates.view = PageSite.V[type]
          break;

        case 70:
          this.certificates.view = PageSite.V[type]
          break;

        case 55:
          this.certificates.view = PageSite.V[type]
          break;
          
        case 40:
          this.certificates.view = PageSite.V[type]
          break;

        case 25:
          this.certificates.view = PageSite.V[type]
          break;
      }

      break;
  
    case 'H':
    
      switch (type) {
        case 100:
          this.certificates.view = PageSite.H[type]
          break;
      
        case 85:
          this.certificates.view = PageSite.H[type]
          break;

        case 70:
          this.certificates.view = PageSite.H[type]
          break;

        case 55:
          this.certificates.view = PageSite.H[type]
          break;
          
        case 40:
          this.certificates.view = PageSite.H[type]
          break;

        case 25:
          this.certificates.view = PageSite.H[type]
          break;
      }

      break;
  }
}


  conform() {
    this.dialogRef.close(true);
  //  this.ngxSpinnerService.hide()  
  }

  formSettings(data) {
    this.dialog.open(CertificateFormComponent,{
      disableClose: true,
      width: '100vw',
      maxWidth: '100vw',
      data
    }).afterClosed().subscribe(result => {

      if(JSON.parse(result)){
        this.snackBar.open('تم الحفظ','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

      }
    });  
  }
}
