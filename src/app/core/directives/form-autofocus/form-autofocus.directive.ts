import { AfterContentInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[formAutofocus]'
})
export class FormAutofocusDirective implements AfterContentInit {

  focusables = ['input', 'select', 'textarea'];

  constructor(private element: ElementRef) { }

  ngAfterContentInit() {
    const input = this.element.nativeElement.querySelector(this.focusables.join(','));
    if (input) {
      // For iOS devices
      if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
        return input.setAttribute('autofocus', '');
      input.focus();
    }
  }

  @HostListener('submit')
  submit() {
    const input = this.element.nativeElement.querySelector(this.focusables.map((x) => `${x}.ng-invalid`).join(','))
    if (input)
      input.focus();
  }
}
