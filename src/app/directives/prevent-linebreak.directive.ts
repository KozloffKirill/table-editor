import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventLinebreak], [prevent-linebreak]'
})
export class PreventLinebreakDirective {

  /**
   * Host listener for keypress event
   *
   * @param {KeyboardEvent} e
   * @memberof PreventLinebreakDirective
   */
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  }
  /**
   * Creates an instance of PreventLinebreakDirective
   * 
   * @memberof PreventLinebreakDirective
   */
  constructor() { }

}
