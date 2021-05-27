import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit, ViewChild, NgZone, Renderer2, ViewChildren, QueryList, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import icClose from '@iconify/icons-ic/twotone-close';
import { Apollo } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Certificate } from 'crypto';
import { DisplayGrid, Draggable, GridsterComponent, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType }  from 'angular-gridster2';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService, FormatModel, FontFamilyModel, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

// interface Certificates {
//   view?: {height: number, width: number},
//   tabs?: Array<
//     {
//       name?: string,
//       details?: {
//       background?: string,
//       components?: 
//         {
//           images?: Array<{
//             img?: string,
//             width?: number,
//             height?: number,
//             x?: number,
//             y?: number,
//             zIndex?: number
//           }>,
//         texts?: Array<{
//             text?: string,
//             width?: number,
//             height?: number,
//             x?: number,
//             y?: number,
//             zIndex?: number
//           }>
//       }
      
//     }
//   }>
// }

export interface Certificates {
  view?: {height?: number, width?: number, screenSize?: number},
  tabs?: Array<
    {
      name?: string,
      details?: {
      background?: string,
      contents?: Array<GridsterItem | {type?: 'img' | 'text' | 'background' | 'qr', content?: string, dragEnabled: boolean}>
    }
  }>
}

interface Safe extends GridsterConfig {
  draggable: Draggable;
}

@Component({
  selector: 'certificate-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './certificate.form.component.html',
  styleUrls: ['./certificate.form.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService],
  
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class CertificateFormComponent implements OnInit {

  // certificates: Certificates = {view: {height: null, width: null}, tabs: [{ name: null, details: {background: null, components: {images: [{img: null, width: null, height: null, x: null, y: null, zIndex: null}], texts: [{text: null, width: null, height: null, x: null, y: null, zIndex: null}]}}}]}

  icClose = icClose;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
 *<a (click)="formSettings({rowID: element.rowID, certificateName: element.certificateName, langSex: element.langSex, cerPosition: element.cerPosition, textsPosition: element.textsPosition,
  langSexType: element.langSexType, cerPositionType: element.cerPositionType, textsPositionType: element.textsPositionType})"
 */

  
  options: GridsterConfig;
  dashboards: Certificates = {
    view: {height: null, width: null, screenSize: null},
    tabs: [{name: null, details: {contents: []}}]
  }
  @ViewChild('tabGroup') tabGroup;
  // public tools: object = {
  //   items: [
  //          'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
  //          'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
  //          'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
  //          'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
  //          'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
  //          'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  //  };


  @ViewChild('inlineRTE')
  public rteObj: RichTextEditorComponent;

  public toolbarSettings: ToolbarModule = {
      items: ['Bold', 'Italic', 'Underline',
          'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
          'CreateLink']
  };
  public format: FormatModel = {
      width: 'auto'
  };
  public fontFamily: FontFamilyModel = {
      width: 'auto'
  };
  public inlineMode: object = { enable: true, onSelection: true };

  
  
  constructor(
    private rd: Renderer2,
    private dialogRef: MatDialogRef<CertificateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCertificate: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

    static eventStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent): void {
      // tslint:disable-next-line:no-console
     // console.info('eventStart', item, itemComponent, event);
    }
  
    static eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent): void {
      // tslint:disable-next-line:no-console
    //  console.info('eventStop', item, itemComponent, event);
    }
    
    static overlapEvent(source: GridsterItem, target: GridsterItem, grid: GridsterComponent): void {
     // console.log('overlap', source, target, grid);
    }

    static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('itemChanged', item, itemComponent);
    }
  
    static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('itemResized', item, itemComponent);
    }
  
    static itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('itemInitialized', item, itemComponent);
    }
  
    static itemRemoved(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('itemRemoved', item, itemComponent);
    }
  
    static itemValidate(item: GridsterItem): boolean {
      return item.cols > 0 && item.rows > 0;
    }
  
    static gridInit(grid: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('gridInit', grid);
    }
  
    static gridDestroy(grid: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('gridDestroy', grid);
    }
  
    static gridSizeChanged(grid: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     // console.info('gridSizeChanged', grid);
    }

ngOnInit(){
  this.options = {
    itemChangeCallback: CertificateFormComponent.itemChange,
    itemResizeCallback: CertificateFormComponent.itemResize,
    itemInitCallback: CertificateFormComponent.itemInit,
    itemRemovedCallback: CertificateFormComponent.itemRemoved,
    itemValidateCallback: CertificateFormComponent.itemValidate,
  gridType: GridType.Fit,
    displayGrid: DisplayGrid.Always,
    pushItems: false,
    swap: true,
    swapWhileDragging: false,
    margin: 0,
    allowMultiLayer: true,
    defaultLayerIndex: 1,
    baseLayerIndex: 2,
    maxLayerIndex: 20,
    maxItemArea: 2500,
    minItemArea: 1,
    minItemRows: 1,
    maxItemRows: 50,
    maxItemCols: 50,
    minItemCols: 1,
    maxRows: 50,
    maxCols: 50,
    minRows: 1,
    minCols: 1,
    draggable: {
      delayStart: 10,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: CertificateFormComponent.eventStop,
        start: CertificateFormComponent.eventStart,
        dropOverItems: false,
        dropOverItemsCallback: CertificateFormComponent.overlapEvent,
    },
    resizable: {
      enabled: true
    }
  };

  
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
    this.dashboards.tabs.shift()

    switch (this.dataFromCertificate.data.cerPositionType) {
      case 'V':
        this.dashboards.view.width = 178.5
        this.dashboards.view.height = 252.45
        break;
    
      case 'H':
        this.dashboards.view.width = 252.45
        this.dashboards.view.height = 178.5
        break;
    }
 
    this.dataFromCertificate.data.langSex.split('-').forEach((name: string, index: number) => {
      this.dashboards.tabs.push({
        name,
        details: {contents: [
                              { content: `http://localhost:3000/uploadedFiles/profiles/white.jpg` , type: "background" , cols: 50, rows: 50, y: 0, x: 0, dragEnabled: false, resizeEnabled: false, layerIndex :0},
                              { content: `http://localhost:3000/uploadedFiles/profiles/empty.png` , type: "text" , cols: 10, rows: 10, y: 0, x: 0, resizeEnabled: true, layerIndex :1},
                              { content: `http://localhost:3000/uploadedFiles/profiles/empty.png` , type: "img" , cols: 10, rows: 10, y: 0, x: 0, resizeEnabled: true, layerIndex :2},
                            ]}
      })

    })
    return
  }

  
  this.dashboards = JSON.parse(data.certificateDetail[0].certificatesDetails)
  this.changePosition(this.dashboards.view.screenSize)

  this.dashboards.tabs.forEach(element =>{
    element.details.contents.forEach(element =>{
      
      if((element.content != null)){

        if(element.content == 'empty.png'){

            if(element.type == 'background'){
              element.content = `http://localhost:3000/uploadedFiles/profiles/white.jpg`;
            } else {
              element.content = `http://localhost:3000/uploadedFiles/profiles/${element.content}`;
            }

        } else {
          element.content = element.content;
        }
      }
    })
  })

})

}

ngAfterViewInit(){
  this.tabGroup.selectedIndex
}



changedOptions(tabGroup) {
  this.tabGroup = tabGroup

  if (this.options.api && this.options.api.optionsChanged) {
    this.options.api.optionsChanged();
  }



}

removeItem($event, tap, item) {
  $event.preventDefault();
  $event.stopPropagation();
  this.dashboards.tabs[tap].details.contents.splice(this.dashboards.tabs[tap].details.contents.indexOf(item),1)
}

removeBackground(tap, item){
  this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = 'http://localhost:3000/uploadedFiles/profiles/empty.png'
}

addItem(type) {
  let index = 0;

  this.dashboards.tabs.forEach(element =>{
    element.details.contents.forEach((element, i) => {
      index =+ i
    })
  })

  switch (type) {
    case 'text':
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `http://localhost:3000/uploadedFiles/profiles/empty.png` , type: "text" , cols: 20, rows: 20, y: 0, x: 0, resizeEnabled: true, layerIndex :index+1});
      break;
  
    case 'img':
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `http://localhost:3000/uploadedFiles/profiles/empty.png` , type: "img" , cols: 10, rows: 10, y: 15, x: 15, resizeEnabled: true, layerIndex :index+1});
      break;

    case 'qr':
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `http://localhost:3000/uploadedFiles/profiles/empty.png` , type: "qr" , cols: 7, rows: 7, y: 10, x: 10, resizeEnabled: true, layerIndex :index+1});
      break;
  }

}



onSelectFile(selectType, tap, item, file){

   //Show image preview
 let reader = new FileReader();
 reader.readAsDataURL(file);
 
  switch (selectType) {

    case 'Imagebackground':
    reader.onload = (event: any) => {
      this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = event.target.result;
      }
      break;
  
    case 'ImageItem':
      reader.onload = (event: any) => {
        this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = event.target.result;
        }
      break;

  }

}




moveItem(mouseEvent, tap, item){

  if (mouseEvent == 'mousedown') {
    console.log(this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].dragEnabled)

    this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].dragEnabled = true
    console.log(this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].dragEnabled)
  } else if (mouseEvent == 'mouseup') {

   // this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].dragEnabled = false

  }
  
}

changePosition(screenSize){

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

      switch (screenSize) {
        case 100:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height
          break;
      
        case 85:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height

          break;

        case 70:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height

          break;

        case 55:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height

          break;
          
        case 40:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height

          break;

        case 25:
          this.dashboards.view.width = PageSite.V[screenSize].width
          this.dashboards.view.height = PageSite.V[screenSize].height

          break;
      }

      break;
  
    case 'H':
    
      switch (screenSize) {
        case 100:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
          break;
      
        case 85:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
          break;

        case 70:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
          break;

        case 55:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
          break;
          
        case 40:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
          break;

        case 25:
          this.dashboards.view.width = PageSite.H[screenSize].width
          this.dashboards.view.height = PageSite.H[screenSize].height
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
