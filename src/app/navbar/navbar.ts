import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  menuOpen = false;
  activeIndex = 0;

  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateIndex(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.updateIndex(e.urlAfterRedirects));
  }

  get gliderTransform(): string {
    return `translateX(${this.activeIndex * 6}rem)`;
  }

  private updateIndex(url: string) {
    if (url === '/' || url === '') this.activeIndex = 0;
    else if (url.startsWith('/about')) this.activeIndex = 1;
    else if (url.startsWith('/directory')) this.activeIndex = 2;
    else if (url.startsWith('/contact')) this.activeIndex = 3;
    else this.activeIndex = 0;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}