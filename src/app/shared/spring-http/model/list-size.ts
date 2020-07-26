import { FormControl } from '@angular/forms';

export class ListSize {
  control: FormControl;
  options: number[];
  default: number;

  constructor(control: FormControl, options: number[]) {
    this.control = control;
    this.options = options;
    this.default = +control.value;
  }
}
