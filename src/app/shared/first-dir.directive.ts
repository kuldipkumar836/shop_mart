import { Directive, ElementRef,Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFirstDir]'
})
export class FirstDirDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { 
    //this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'blue');
  }
  @HostBinding('style.backgroundColor') bgcolor
  @HostListener('mouseover') myMouseOver(){
    this.bgcolor = 'grey';
  }
  @HostListener('mouseout') myMouseOut(){
    this.bgcolor = 'white';
  }
  @HostListener('click') myClick(){
    window.alert ('clicked')
  }
}
