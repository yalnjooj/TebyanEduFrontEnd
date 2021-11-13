import { Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@UntilDestroy()
@Directive({
  selector: '[coorDinatorList]'
})
export class CoorDinatorList {

  constructor(private parentElement: ElementRef, private renderer: Renderer2, private apollo: Apollo) { }


   @ViewChild('tdElement') private element: ElementRef;

    @Input('coorDinatorList') set coorDinatorList({companyId, coordinatorId}: any) {
      
      this.apollo.watchQuery({
        query: gql`
            query coordinator($companyprofile_id: ID!){
              coordinator(companyprofile_id: $companyprofile_id){
                _01_personal{
                  id
                  name_AR
                }
              }
          }
          `,
          variables: {
            companyprofile_id: companyId
          }
      }).valueChanges.subscribe(( {data}: any ) => {

        const parent = this.parentElement.nativeElement;

        const childElements = parent.children;
        for (let child of childElements) {
          this.renderer.removeChild(parent, child);
        }

        data.coordinator.forEach(element => {

        const matOption = this.renderer.createElement('option');
        const text = this.renderer.createText(element._01_personal.name_AR);

        this.renderer.setAttribute(matOption, 'value', element._01_personal.id)
                      element._01_personal.id == coordinatorId? this.renderer.setAttribute(matOption, 'selected', null) : null
                      this.renderer.setProperty(matOption, 'value', element._01_personal.id)

        this.renderer.appendChild(matOption, text);
        this.renderer.appendChild(parent, matOption);

      });

})

      
              }

  
}
