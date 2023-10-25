import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  templateUrl: './benefit-card.component.html',
  styleUrls: ['./benefit-card.component.scss']
})
export class BenefitCardComponent {
  @Input() headerTxt: string = "";
  @Input() bodyTxt: string = "";
  @Input() imgSrc: string = "";
  @Input() delay: number = 0;
  @Input() active: number = 0;
  @ViewChild("benefitContainer") benefitContainer: ElementRef | null = null;

  timer1: NodeJS.Timeout | null = null;
  timer2: NodeJS.Timeout | null = null;
  timer3: NodeJS.Timeout | null = null;

  constructor (private renderer: Renderer2){}

  ngAfterViewInit() {
    const element = this.benefitContainer?.nativeElement;

    this.timer1 = setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '100%');

      this.timer2 = setInterval(() => {
        this.renderer.setStyle(element, 'opacity', '50%');
      }, this.active);
  
      this.timer3 = setInterval(() => {
        this.renderer.setStyle(element, 'opacity', '100%');
      }, 3 * this.active);
    }, this.delay);
  }

  ngOnDestroy() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
    if (this.timer3) {
      clearTimeout(this.timer3);
    }
  }
}
