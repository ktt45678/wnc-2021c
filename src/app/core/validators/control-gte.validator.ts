import { AbstractControl, ValidationErrors } from '@angular/forms';

export const controlGte = (controlName: string, gteControlName: string) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceControl = control.get(controlName);
    const gteControl = control.get(gteControlName);
    if (sourceControl && gteControl && sourceControl.value && sourceControl.value < gteControl.value)
      sourceControl.setErrors({ controlGte: true });
    return null;
  }
};
