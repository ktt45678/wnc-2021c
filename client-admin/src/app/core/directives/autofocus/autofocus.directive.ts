import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[controlAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private element: ElementRef) { }

  ngAfterContentInit() {
    // For iOS devices
    if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
      return this.element.nativeElement.setAttribute('autofocus', '');
    this.element.nativeElement.focus();
  }
}
