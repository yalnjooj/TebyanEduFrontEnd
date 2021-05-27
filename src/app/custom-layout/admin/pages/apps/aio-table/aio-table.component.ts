import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels, myTableData } from 'src/static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { DateTime } from 'luxon';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

export interface TableHeader {
  id: number
  avatar: string
  organisationName: string
  email: string
  phoneNumber: number
  organisationType: string
  country: string
  status: boolean
  endDate: DateTime
  createdDate:Date
  editDate: Date
}

@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class AioTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Avatar', property: 'image', type: 'image', visible: true },
    { label: 'اسم المنظمة', property: 'organisationName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'البريد الإلكتروني', property: 'email', type: 'text', visible: true },
    { label: 'الجوال', property: 'phoneNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'نوع المنظمة', property: 'organisationType', type: 'text', visible: true },
    { label: 'الدولة', property: 'country', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'الحالة', property: 'checkbox', type: 'mycheckbox', visible: true },
    { label: 'تاريخ إنتهاء الإشتراك', property: 'endDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'تاريخ إنشاء الحساب', property: 'createdDate', type: 'text', visible: true },
    { label: 'آخر تعديل', property: 'editDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] }
  ];
  displayedColumns: string[] = ['avatar','companyName','email','tell','companyType','country','isActive','days','expireDate','createdAt','updatedAt'];

  myTableData: object[];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private apollo: Apollo, private router: Router) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */

   setDate(id, month){

    switch(month) {
      case 1:
        this.setRenew(id, new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*1))
        break;
      case 3:
        this.setRenew(id, new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*3))
        break;
      case 6:
        this.setRenew(id, new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*6))
        break;
      case 12:
        this.setRenew(id, new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*12))
        break;
      case 0:
        this.setRenew(id, new Date('2000-01-01 00:00:00.000000'))
        break;
    }
  //  this.router.onSameUrlNavigation = 'reload';
    this.ngOnInit();
   }
   setRenew(id, expireDate){
    this.apollo.mutate({
      mutation: gql`
        mutation updateUser( $id: ID! $expireDate: Date){
          updateUser( id: $id, expireDate: $expireDate){
            id
            }
          }
      `,
      variables: {
        id: id,
        expireDate: expireDate,
      }
    }).subscribe(data => { })
  }
  getData() {
    return of(myTableData.map(customer => new Customer(customer)));
  }
  getStatue(date){
    let days = (Math.round((Number((new Date(date))) - Number(new Date(Date.now()))) / (1000 * 60 * 60 * 24))+1)
    if(days <= 10){
      //(days > 1)  && (days < 11)
      return true

    } else if(days == 0) {
      return false
    }
  }
getDays(date){
  let days = (Math.round((Number((new Date(date))) - Number(new Date(Date.now()))) / (1000 * 60 * 60 * 24))+1)
  if(days <= -1){
    return 0
  } else {
    return days
  }
  //(Math.round(((new Date('2021-06-18T21:02:12.000Z')) - (new Date(Date.now()))) / (1000 * 60 * 60 * 24))+1)

//  https://www.angularjswiki.com/angular/angular-date-pipe-formatting-date-times-in-angular-with-examples/
//  new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*1)
//  new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*3)
//  new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*6)
//  new Date(Date.now()+ (1000 * 60 * 60 * 24 * 30)*12)

}
  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
          query{
            users{
              id
              avatar
              companyName
              email
              tell
              companyType{
                companyType
              }
              country{
                countrylityNameAr
                PHONECODE
              }
              isActive
              expireDate
              createdAt
              updatedAt
    
  }
      }
      `
    }).valueChanges.subscribe(( data: any ) => {

              this.myTableData = data.data.users
              // ({
              //   id: 0,
              //   avatar: 'http://localhost:3000/uploadedFiles/flags/48x48/at.png',
              //   organisationName: 'تبيان',
              //   email: 'fdsd@gmail.com',
              //   phoneNumber: '+966 5452441212',
              //   organisationType: 'شركة',
              //   country: 'السعودية',
              //   status: false,
              //   endDate: new Date().toLocaleString(),
              //   createdDate: DateTime.local().minus({ minutes: 14 }).toRelative(),
              //   editDate: new Date().toLocaleDateString("en-US"),
              // })

     

    })
    

    this.getData().subscribe(customers => {
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }


 updateUserData(id, isActive, check){

  this.apollo.mutate({
    mutation: gql`
      mutation updateUser( $id: ID! $isActive: Boolean){
        updateUser( id: $id, isActive: $isActive){
          id
          email
          }
        }
    `,
    variables: {
      id: id,
      isActive: !check._checked,
    }
  }).subscribe(data => { })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.unshift(new Customer(customer));
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: Customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Customer(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomer(customer: Customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => this.deleteCustomer(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }
}
