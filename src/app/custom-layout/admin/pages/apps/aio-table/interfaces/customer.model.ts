
export class Customer {

// { label: 'avatar', property: 'avatar', type: 'image', visible: true },
// { label: 'اسم المنظمة', property: 'organisationName', type: 'text', visible: true, cssClasses: ['font-medium'] },
// { label: 'البريد الإلكتروني', property: 'email', type: 'text', visible: true },
// { label: 'الجوال', property: 'phoneNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
// { label: 'نوع المنظمة', property: 'organisationType', type: 'text', visible: true },
// { label: 'الدولة', property: 'country', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
// { label: 'الحالة', property: 'status', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
// { label: 'تاريخ الإنتهاء', property: 'endDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
// { label: 'تاريخ الإنشاء', property: 'createdDate', type: 'text', visible: true },
// { label: 'تاريخ التعديل', property: 'editDate', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] }


  // id: number;
  // avatar: string;
  // organisationName: string;
  // email: string;
  // phoneNumber: string;
  // organisationType: string;
  // country: number;
  // status: string;
  // endDate: string;
  // createdDate: any;
  // editDate: any;

  // this.id = customer.id;
  // this.avatar = customer.avatar;
  // this.organisationName = customer.organisationName;
  // this.email = customer.email;
  // this.phoneNumber = customer.phoneNumber;
  // this.organisationType = customer.organisationType;
  // this.country = customer.country;
  // this.status = customer.status;
  // this.endDate = customer.endDate;
  // this.createdDate = customer.createdDate;
  // this.editDate = customer.editDate;

  imageSrc: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: number;
  city: string;
  phoneNumber: string;
  mail: string;
  labels: any;

  id: string;
  avatar: string;
  organisationName: string;
  email: string;;
  phoneNumber: string;
  organisationType: string;
  country: string;
  status: string;
  endDate: string;
  createdDate: string;
  editDate: string;


  constructor(customer) {
    this.imageSrc = customer.imageSrc;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.street = customer.street;
    this.zipcode = customer.zipcode;
    this.city = customer.city;
    this.phoneNumber = customer.phoneNumber;
    this.mail = customer.mail;
    this.labels = customer.labels;

    this.id = customer.id;
    this.avatar = customer.avatar;
    this.organisationName = customer.organisationName;
    this.email = customer.email;
    this.phoneNumber = customer.phoneNumber;
    this.organisationType = customer.phoneNumber;
    this.country = customer.country;
    this.status = customer.status;
    this.endDate = customer.endDate;
    this.createdDate = customer.createdDate;
    this.editDate = customer.editDate;
  }

  get users() {
    let user = '';

    if (this.avatar && this.organisationName && this.email && this.phoneNumber  && this.organisationType && this.country && this.status && this.endDate && this.createdDate && this.editDate ) {
      user = this.avatar + ' ' + this.organisationName + ' ' + this.email + ' ' + this.phoneNumber + ' ' + this.organisationType + ' ' + this.country + ' ' + this.status + ' ' + this.endDate + ' ' + this.createdDate + ' ' + this.editDate;
    } else if (this.avatar) {
      user = this.avatar;
    } else if (this.organisationName) {
      user = this.organisationName;
    } else if (this.email) {
      user = this.email;
    } else if (this.phoneNumber) {
      user = this.phoneNumber;
    } else if (this.organisationType) {
      user = this.organisationType;
    } else if (this.country) {
      user = this.country;
    } else if (this.status) {
      user = this.status;
    } else if (this.endDate) {
      user = this.endDate;
    } else if (this.createdDate) {
      user = this.createdDate;
    } else if (this.editDate) {
      user = this.editDate;
    }

    return user;
  }
  get name() {
    let name = '';

    if (this.firstName && this.lastName) {
      name = this.firstName + ' ' + this.lastName;
    } else if (this.firstName) {
      name = this.firstName;
    } else if (this.lastName) {
      name = this.lastName;
    }

    return name;
  }

  set name(value) {
  }

  get address() {
    return `${this.street}, ${this.zipcode} ${this.city}`;
  }

  set address(value) {
  }
}
