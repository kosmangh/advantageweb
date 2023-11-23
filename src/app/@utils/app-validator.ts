import { AbstractControl, ValidationErrors } from '@angular/forms';
export class AppValidator {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true }
        }
        return null;
    }
    static validateEcobankMail(control: AbstractControl): ValidationErrors | null {
        if (!(control.value as string).includes('ecobank')) {
            return { validateEcobankMail: true }
        }
        return null;
    }
    static validateOnlyNumber(control: AbstractControl): ValidationErrors | null {
        if (!(control.value as string).includes('ecobank')) {
            return { validateEcobankMail: true }
        }
        return null;
    }

}