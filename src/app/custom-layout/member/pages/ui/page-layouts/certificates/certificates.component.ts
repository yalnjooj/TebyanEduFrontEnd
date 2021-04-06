import { Component, OnInit, ViewChild } from '@angular/core';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'احمد', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'أحمد', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'vex-blank',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(){
    this.dialog.open(DialogAddCertificate,{
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}

@Component({
  selector: 'dialog-add-certificate',
  template: `
  
  <h2 mat-dialog-title>Install Angular</h2>
<mat-dialog-content class="mat-typography">
  <h3>Develop across all platforms</h3>
  <p>Learn one way to build applications with Angular and reuse your code and abilities to build
    apps for any deployment target. For web, mobile web, native mobile and native desktop.</p>

  <h3>Speed &amp; Performance</h3>
  <p>Achieve the maximum speed possible on the Web Platform today, and take it further, via Web
    Workers and server-side rendering. Angular puts you in control over scalability. Meet huge
    data requirements by building data models on RxJS, Immutable.js or another push-model.</p>

  <h3>Incredible tooling</h3>
  <p>Build features quickly with simple, declarative templates. Extend the template language with
    your own components and use a wide array of existing components. Get immediate Angular-specific
    help and feedback with nearly every IDE and editor. All this comes together so you can focus
    on building amazing apps rather than trying to make the code work.</p>

  <h3>Loved by millions</h3>
  <p>From prototype through global deployment, Angular delivers the productivity and scalable
    infrastructure that supports Google's largest applications.</p>

  <h3>What is Angular?</h3>

  <p>Angular is a platform that makes it easy to build applications with the web. Angular
    combines declarative templates, dependency injection, end to end tooling, and integrated
    best practices to solve development challenges. Angular empowers developers to build
    applications that live on the web, mobile, or the desktop</p>

  <h3>Architecture overview</h3>

  <p>Angular is a platform and framework for building client applications in HTML and TypeScript.
  Angular is itself written in TypeScript. It implements core and optional functionality as a
  set of TypeScript libraries that you import into your apps.</p>

  <p>The basic building blocks of an Angular application are NgModules, which provide a compilation
  context for components. NgModules collect related code into functional sets; an Angular app is
  defined by a set of NgModules. An app always has at least a root module that enables
  bootstrapping, and typically has many more feature modules.</p>

  <p>Components define views, which are sets of screen elements that Angular can choose among and
  modify according to your program logic and data. Every app has at least a root component.</p>

  <p>Components use services, which provide specific functionality not directly related to views.
  Service providers can be injected into components as dependencies, making your code modular,
  reusable, and efficient.</p>

  <p>Both components and services are simply classes, with decorators that mark their type and
  provide metadata that tells Angular how to use them.</p>

  <p>The metadata for a component class associates it with a template that defines a view. A
  template combines ordinary HTML with Angular directives and binding markup that allow Angular
  to modify the HTML before rendering it for display.</p>

  <p>The metadata for a service class provides the information Angular needs to make it available
  to components through Dependency Injection (DI).</p>

  <p>An app's components typically define many views, arranged hierarchically. Angular provides
  the Router service to help you define navigation paths among views. The router provides
  sophisticated in-browser navigational capabilities.</p>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>حفظ</button>
</mat-dialog-actions>

  `
})
export class DialogAddCertificate {}
