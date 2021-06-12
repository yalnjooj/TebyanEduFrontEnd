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
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService, FormatModel, FontFamilyModel, RichTextEditorComponent, ToolbarType } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { ComponentsOverviewDialogsComponent } from 'src/app/custom-layout/admin/pages/ui/components/components-overview/components/components-overview-dialogs/components-overview-dialogs.component';

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
      contents?: Array<GridsterItem | {type?: 'img' | 'text' | 'background' | 'qr', content?: string, dragEnabled: boolean, cols: number, rows: number, x: number, y: number, }>
    }
  }>
}


interface Safe extends GridsterConfig {
  draggable: Draggable;
}

@Component({
  selector: 'certificate-component',
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
  dashboards2: Certificates = {
    view: {height: null, width: null, screenSize: null},
    tabs: [{name: null, details: {contents: []}}]
  }
  @ViewChild('tabGroup') tabGroup;
//   public tools: ToolbarModule = {
//     items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
//         'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
//         'LowerCase', 'UpperCase','SuperScript', 'SubScript', '|',
//         'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
//         'Outdent', 'Indent', '|',
//         'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
//         'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
// };


  @ViewChild('inlineRTE') inlineRTE: RichTextEditorComponent;
  @ViewChild('rteFloatObj') rteFloatObj;
  tabIndex: number;
  isSaved: boolean = true;
  tagsLenght1 = 0;

  tagsNames: any = [{ start: 0, end: 0, startTag: 0, endTag: 0, text: '' }];

  public fontFamily: Object = {
    items: [
      {text: "Cairo", value: "Cairo", command: "Font", subCommand: "FontName"},
      {text: "Segoe UI", value: "Segoe UI", class: "e-segoe-ui",  command: "Font", subCommand: "FontName"},
      {text: "Roboto", value: "Roboto",  command: "Font", subCommand: "FontName"}, // here font is added
      {text: "Great vibes", value: "Great Vibes,cursive",  command: "Font", subCommand: "FontName"}, // here font is added
      {text: "Impact", value: "Impact,Charcoal,sans-serif", class: "e-impact", command: "Font", subCommand: "FontName"},
      {text: "Tahoma", value: "Tahoma,Geneva,sans-serif", class: "e-tahoma", command: "Font", subCommand: "FontName"},
    ]
  };
  
  public toolbarSettings: ToolbarModule = {
      items: [
           'Bold', 'Italic',  'FontName', "-", 'FontSize', 'Alignments','-', 'FontColor', 'BackgroundColor',
             '-', 'ClearFormat','CreateLink']
  };
  public format: FormatModel = {
      width: 'auto'
  };
  // public fontFamily: FontFamilyModel = {
  //     width: 'auto'
  // };
  public inlineMode: object = { enable: true, onSelection: true };
  
  
  constructor(
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
      // tslint:disable-next-line:no-console this.tabGroup.selectedIndex 
    //  console.info('itemChanged', item, itemComponent);
     // console.info('selectedIndex', this.tabInde);
    //  this.dashboards.tabs[tap].details.contents.splice(this.dashboards.tabs[tap].details.contents.indexOf(item),1)

    }
  
    static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
    //  console.info('itemResized', item, itemComponent);
    }
  
    static itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
     //console.info('itemInitialized', item, itemComponent);
    }
  
    static itemRemoved(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
      // tslint:disable-next-line:no-console
      // console.info('itemRemoved', item, itemComponent,);
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

  this.ngxSpinnerService.show()

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
    query certificateDetails($id: Int! $uID: ID!){
      certificateDetails(id: $id uID: $uID){
        id
        certificatesDetails
      }
    }
  `,
  variables: {
    uID: parseInt(this.dataFromCertificate.uID),
    id: parseInt(this.dataFromCertificate.cerID)
  }
}).valueChanges.subscribe(( {data}: any ) => {

  this.dashboards = JSON.parse(data.certificateDetails[0].certificatesDetails)
  this.dashboards2 = this.dashboards;
  
  this.changePosition(this.dashboards.view.screenSize)


  let ofLE1: any = [];
  let ofLE2: any = [];
  this.dashboards.tabs.forEach((element, index) =>{

    switch (index) {
      case 0:

        ofLE1.push(element.details.contents)
        break;

      case 1:

        ofLE2.push(element.details.contents)
        break;

    }
  })


  if(ofLE2[0] == undefined){
    this.tagsLenght1 = this.discoveryTags(ofLE1[0])
  } else {
    // console.log(ofLE1[0].concat(ofLE2[0]))
    this.tagsLenght1 = this.discoveryTags(ofLE1[0].concat(ofLE2[0]))
  }



  this.ngxSpinnerService.hide()
})

}

changeHtmlValue(inlineRTE, tap, item){

  
    this.isSaved = false;
  
    this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = inlineRTE.getHtml()
    
    let ofLE1: any = [];
    let ofLE2: any = [];
    this.dashboards.tabs.forEach((element, index) =>{
  
      switch (index) {
        case 0:
  
          ofLE1.push(element.details.contents)
          break;
  
        case 1:
  
          ofLE2.push(element.details.contents)
          break;
  
      }
    })
  
  
    if(ofLE2[0] == undefined){
      this.tagsLenght1 = this.discoveryTags(ofLE1[0])
    } else {
      // console.log(ofLE1[0].concat(ofLE2[0]))
      this.tagsLenght1 = this.discoveryTags(ofLE1[0].concat(ofLE2[0]))
    }
  
}

// changeItemSize(tap, item){
  
// const newCols = item.cols
// const newRows = item.rows
// const newX = item.x
// const newY = item.y
// const oldCols = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].cols
// const oldRows = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].rows
// const oldX = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].x
// const oldY = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].y

// console.log(oldCols)
// console.log(newCols)
// console.log(newCols != oldCols)
// console.log('----------------')

// console.log(oldRows)
// console.log(newRows)
// console.log(newRows != oldRows)
// console.log('----------------')

// console.log(newX)
// console.log(oldX)
// console.log(newX != oldX)
// console.log('----------------')


// console.log(newY)
// console.log(oldY)
// console.log(newY != oldY)
// console.log('----------------')


// // this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].cols = item.cols
// // this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].rows = item.rows
// // this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].x = item.x
// // this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].y = item.y

// }


ngAfterViewInit(){
  this.tabIndex = this.tabGroup.selectedIndex
}



changedOptions(tabGroup) {
  this.tabIndex = tabGroup.selectedIndex

  if (this.options.api && this.options.api.optionsChanged) {
    this.options.api.optionsChanged();
  }



}

removeItem($event, tap, item, type) {

  switch (type) {
    case 'img':
      
  let deletFile = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content

  if(deletFile == 'empty.png'){

    this.dashboards.tabs[tap].details.contents.splice(this.dashboards.tabs[tap].details.contents.indexOf(item),1)

    this.apollo.mutate({
      mutation: gql`
          mutation updateCertificate($id: ID! $certificatesDetails: String){
            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
          }
        `,
        variables: {
          id: parseInt(this.dataFromCertificate.cerID),
          certificatesDetails: JSON.stringify(this.dashboards)
        }
    }).subscribe(( {data}: any ) => {
      this.ngxSpinnerService.hide() 
    })


    this.ngxSpinnerService.hide() 
return
  }

  
  this.apollo.mutate({
    mutation: gql`
        mutation mutatFiles($files: Upload $status: String! $fileName: String){
          mutatFiles(files: $files status: $status fileName: $fileName)
        }
      `,
      variables: {
        files: null,
        fileName: deletFile,
        status: 'delete'
      },
      context: {
        useMultipart: true
      }
  }).subscribe(( {data}: any ) => {
    
    this.dashboards.tabs[tap].details.contents.splice(this.dashboards.tabs[tap].details.contents.indexOf(item),1)

    this.apollo.mutate({
      mutation: gql`
          mutation updateCertificate($id: ID! $certificatesDetails: String){
            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
          }
        `,
        variables: {
          id: parseInt(this.dataFromCertificate.cerID),
          certificatesDetails: JSON.stringify(this.dashboards)
        }
    }).subscribe(( {data}: any ) => {
      this.ngxSpinnerService.hide() 
    })


    this.ngxSpinnerService.hide() 
  })

      break;
  
      case 'text':
      case 'qr':
    
      this.dashboards.tabs[tap].details.contents.splice(this.dashboards.tabs[tap].details.contents.indexOf(item),1)
  
      this.apollo.mutate({
        mutation: gql`
            mutation updateCertificate($id: ID! $certificatesDetails: String){
              updateCertificate(id: $id certificatesDetails: $certificatesDetails)
            }
          `,
          variables: {
            id: parseInt(this.dataFromCertificate.cerID),
            certificatesDetails: JSON.stringify(this.dashboards)
          }
      }).subscribe(( {data}: any ) => {
        this.ngxSpinnerService.hide() 
      })
  
  
      this.ngxSpinnerService.hide()

      break;
  }



}

removeBackground(tap, item){

 let deletFile = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content

  this.apollo.mutate({
    mutation: gql`
        mutation mutatFiles($files: Upload $status: String! $fileName: String){
          mutatFiles(files: $files status: $status fileName: $fileName)
        }
      `,
      variables: {
        files: null,
        fileName: deletFile,
        status: 'delete'
      },
      context: {
        useMultipart: true
      }
  }).subscribe(( {data}: any ) => {
    this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = 'white.jpg';

    this.apollo.mutate({
      mutation: gql`
          mutation updateCertificate($id: ID! $certificatesDetails: String){
            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
          }
        `,
        variables: {
          id: parseInt(this.dataFromCertificate.cerID),
          certificatesDetails: JSON.stringify(this.dashboards)
        }
    }).subscribe(( {data}: any ) => {
      this.ngxSpinnerService.hide() 
    })


    this.ngxSpinnerService.hide() 
  })

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
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `<b>نص تجريبي</b>` , type: "text" , cols: 20, rows: 20, y: 0, x: 0, resizeEnabled: true, layerIndex :index+1});
      break;
  
    case 'img':
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `empty.png` , type: "img" , cols: 10, rows: 10, y: 15, x: 15, resizeEnabled: true, layerIndex :index+1});
      break;

    case 'qr':
      this.dashboards.tabs[this.tabGroup.selectedIndex].details.contents.push({ content: `qr-code.png` , type: "qr" , cols: 5, rows: 7, y: 10, x: 10, resizeEnabled: true, layerIndex :index+1});
      break;
  }

}


onSelectFile(selectType, tap, item, file: File){


  if(!file) return;
  
  const imgSize = parseFloat(((file.size / (1024*1024)).toFixed(2)))
  let message = 'لم يتم اختيار صورة !!';
  var pattern = /image-*/;

  

    if (file.type.match(pattern)) {
      if((imgSize > 1)){

        message = 'يجب أن يكون حجم الصورة أقل من 1MB !!';

        } else {
          message = 'تم عرض الصورة بنجاح !!';

          //Show image preview
          switch (selectType) {
        
            case 'Imagebackground':

              if(this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content == 'white.jpg'){  
              console.log('create')

                this.apollo.mutate({
                  mutation: gql`
                      mutation mutatFiles($files: Upload $status: String! $fileName: String){
                        mutatFiles(files: $files status: $status fileName: $fileName)
                      }
                    `,
                    variables: {
                      files: file,
                      fileName: null,
                      status: 'create'
                    },
                    context: {
                      useMultipart: true
                    }
                }).subscribe(( {data}: any ) => {

                    this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = data.mutatFiles;

                    this.apollo.mutate({
                      mutation: gql`
                          mutation updateCertificate($id: ID! $certificatesDetails: String){
                            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
                          }
                        `,
                        variables: {
                          id: parseInt(this.dataFromCertificate.cerID),
                          
                          certificatesDetails: JSON.stringify(this.dashboards)
                        }
                    }).subscribe(( {data}: any ) => {
                      this.ngxSpinnerService.hide() 
                    })


                  this.ngxSpinnerService.hide() 
                })

                
              } else {
                console.log('update')
                let updateFile = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content

                this.apollo.mutate({
                  mutation: gql`
                      mutation mutatFiles($files: Upload $status: String! $fileName: String){
                        mutatFiles(files: $files status: $status fileName: $fileName)
                      }
                    `,
                    variables: {
                      files: file,
                      fileName: updateFile,
                      status: 'update'
                    },
                    context: {
                      useMultipart: true
                    }
                }).subscribe(( {data}: any ) => {

                  this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = data.mutatFiles;

                    this.apollo.mutate({
                      mutation: gql`
                          mutation updateCertificate($id: ID! $certificatesDetails: String){
                            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
                          }
                        `,
                        variables: {
                          id: parseInt(this.dataFromCertificate.cerID),
                          
                          certificatesDetails: JSON.stringify(this.dashboards)
                        }
                    }).subscribe(( {data}: any ) => {
                      this.ngxSpinnerService.hide() 
                    })


                  this.ngxSpinnerService.hide() 
                })

              }

              break;
          
            case 'ImageItem':

              if(this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content == 'empty.png'){  
                console.log('create')
  
                  this.apollo.mutate({
                    mutation: gql`
                        mutation mutatFiles($files: Upload $status: String! $fileName: String){
                          mutatFiles(files: $files status: $status fileName: $fileName)
                        }
                      `,
                      variables: {
                        files: file,
                        fileName: null,
                        status: 'create'
                      },
                      context: {
                        useMultipart: true
                      }
                  }).subscribe(( {data}: any ) => {
  
                   this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = data.mutatFiles;
  

                          
                    this.apollo.mutate({
                      mutation: gql`
                          mutation updateCertificate($id: ID! $certificatesDetails: String){
                            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
                          }
                        `,
                        variables: {
                          id: parseInt(this.dataFromCertificate.cerID),
                          
                          certificatesDetails: JSON.stringify(this.dashboards)
                        }
                    }).subscribe(( {data}: any ) => {
                      this.ngxSpinnerService.hide() 
                    })
  
                    this.ngxSpinnerService.hide() 
                  })
  
                  
                } else {
                  console.log('update')
                  let updateFile = this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content
  
                  this.apollo.mutate({
                    mutation: gql`
                        mutation mutatFiles($files: Upload $status: String! $fileName: String){
                          mutatFiles(files: $files status: $status fileName: $fileName)
                        }
                      `,
                      variables: {
                        files: file,
                        fileName: updateFile,
                        status: 'update'
                      },
                      context: {
                        useMultipart: true
                      }
                  }).subscribe(( {data}: any ) => {
  
                    this.dashboards.tabs[tap].details.contents[this.dashboards.tabs[tap].details.contents.indexOf(item)].content = data.mutatFiles;
  
                      this.apollo.mutate({
                        mutation: gql`
                            mutation updateCertificate($id: ID! $certificatesDetails: String){
                              updateCertificate(id: $id certificatesDetails: $certificatesDetails)
                            }
                          `,
                          variables: {
                            
                            ceID: parseInt(this.dataFromCertificate.ceID),
                            certificatesDetails: JSON.stringify(this.dashboards)
                          }
                      }).subscribe(( {data}: any ) => {
                        this.ngxSpinnerService.hide() 
                      })
  
  
                    this.ngxSpinnerService.hide() 
                  })
  
                }                
              break;
          }

        }

    
    } else {
      message = 'صيغة غير مقبولة !!';
    }

      this.snackBar.open(message,'إغلاق', {
        duration: 6000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  


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

  switch (this.dataFromCertificate.cerPositionType) {

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

addVarablesCode(){
  
  this.inlineRTE.executeCommand('insertHTML', '<span style="font-size: 14pt;" class="varablesCode"><span style="font-size: 14pt; color: red;">«</span>____<span style="font-size: 14pt; color: red;">»</span></span>');

}

discoveryTags(textVal){

  let arrOFop = [{start: null, end: null, startTag: null,  endTag: null, text: null}]

  let elementVal = textVal.filter((element, index)=>{
    return element.type == 'text'
  })
  
  let context = '';
  elementVal.forEach((element, index)=>{
    context += element.content
  })


  
  const val = context.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '');
  arrOFop.shift()
    var start: number;
    var end: number;
    var startTag: string;
    var endTag: string;

val.split('').forEach((value, index) =>{

       if(value == '«'){
       start = index;
       startTag = value;
     }

    for(let i = index; val.length > i ; i++){

       if(value == '»'){
       end = index;
       endTag = value; 

    arrOFop.push({start, startTag, end, endTag, text: val.slice(start+1, end)})
       break;
     }

     i++
    }

  })

let mm =  arrOFop.filter(function(value, index, arr){
  if(value.text.search('«') >= 1 || value.text.search('»') >= 1 || value.text.search('«»') >= 1){
    return false
  } else {
    return true
  }
    
});


function removeDuplicates(data, key) {
  
  return [
    ...new Map(data.map(item => [key(item), item])).values()
  ]

};


this.tagsNames = removeDuplicates(mm, item => item.text)

return this.tagsNames.length
}


conform() {
    this.ngxSpinnerService.show()

    this.apollo.mutate({
      mutation: gql`
          mutation updateCertificate($id: ID! $certificatesDetails: String){
            updateCertificate(id: $id certificatesDetails: $certificatesDetails)
          }
        `,
        variables: {
          id: parseInt(this.dataFromCertificate.cerID),
          certificatesDetails: JSON.stringify(this.dashboards)
        }
    }).subscribe(( {data}: any ) => {
      this.isSaved = true;
      this.ngxSpinnerService.hide() 
    })

    this.ngxSpinnerService.hide() 
   // this.dialogRef.close(true);
}

onCreate(){
 // this.discoveryTags(textVal)
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
