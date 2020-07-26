import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export class MustMatch {

    static val (password1: string, password2: string) {
        return (formGroup: FormGroup) => {
            const control1 = formGroup.controls[password1];
            const control2 = formGroup.controls[password2]; 



    
    
            // set error on matchingControl if validation fails
            if (control1.value !== control2.value) {
                control2.setErrors({ mustMatch: true });
            } else {
                control2.setErrors(null);
            }
        }
 
    }
    
}
