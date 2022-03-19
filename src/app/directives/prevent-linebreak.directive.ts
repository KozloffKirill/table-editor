import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventLinebreak], [prevent-linebreak]'
})
export class PreventLinebreakDirective {

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  }
  constructor() { }

}
