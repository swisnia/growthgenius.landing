import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  @ViewChild('benefitsHeader') benefitsHeader: ElementRef | null = null;
  @ViewChild('benefitsHeaderWrapper') benefitsHeaderWrapper: ElementRef | null = null;
  @ViewChild('benefitsContainer') benefitsContainer: ElementRef | null = null;
  @ViewChild('singUpFormSection') singUpFormSection: any;

  isSending = false;
  isFormSended = false;

  singUpForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.email
    ])
  });

  timer1: NodeJS.Timeout | null = null;
  timer2: NodeJS.Timeout | null = null;

  constructor (private renderer: Renderer2){}

  commonQuestions = [
    {head: "What's GrowthGenius?", info: "GrowthGenius is a gamification platform to help your team develop faster"},
    {head: "What are the benefits of using the GrowthGenius app?", info: "The GrowthGenius app will help your team develop their skills faster through gamification and provide statistics on the development of your team members"},
    {head: "How can I join a Team?", info: "To join the team, you can be invited by the team administrator or create your own team"},
    {head: "Why can't I see the team I created?", info: "After creating a team, the administrator must approve it. This may take up to 24 hours. We will inform you about the team's acceptance via e-mail, then after logging in to your account you will see your team's dashboard"},
  ];


  startAnimation() {
    this.renderer.addClass(this.benefitsHeader?.nativeElement, 'animate-benefits-header');

    this.timer1 = setTimeout(() => {
      this.renderer.addClass(this.benefitsHeaderWrapper?.nativeElement, 'fade-benefits-header');

      this.timer2 = setTimeout(() => {
        this.renderer.addClass(this.benefitsContainer?.nativeElement, 'show-benefits-container');
      }, 1000);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
  }

  scrollToSingUpForm() {
    this.singUpFormSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  signUp(e: Event) {
    this.singUpForm.markAsTouched();
    if (this.singUpForm.invalid) return;

    this.isSending = true;

    const email = this.singUpForm.value.email
    if (!email) return;

    emailjs.sendForm('service_yh2gvya', 'template_618ssop', e.target as HTMLFormElement, '1DiqxXjO4RZZe6F9H')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.isFormSended = true;
      }, (error) => {
        console.log(error.text);
      }).finally(() => {
        this.isSending = false;
      });
  }
} 
