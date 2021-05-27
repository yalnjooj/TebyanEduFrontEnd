import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewImags'
})
export class ViewImags implements PipeTransform {
  
  transform(value: any): any {


    console.log(value)
    return `http://localhost:3000/uploadedFiles/profiles/${value}`
  }

}
