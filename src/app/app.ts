import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { FloatingDial } from './floating-dial/floating-dial';
import { HotlineService } from './services/hotline.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FloatingDial],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('RESQ');

  constructor(private svc: HotlineService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(); 
  }
}