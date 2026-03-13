import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true,
})
export class FadeUpDirective implements AfterViewInit, OnDestroy {
  /** Optional delay in milliseconds before the transition starts */
  @Input() appFadeUp: number = 0;

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {
    // Apply hidden state immediately so there is no flash before Angular init
    (el.nativeElement as HTMLElement).classList.add('reveal');
  }

  ngAfterViewInit() {
    const el = this.el.nativeElement as HTMLElement;

    if (this.appFadeUp > 0) {
      el.style.transitionDelay = `${this.appFadeUp}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          this.observer?.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
