import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { FloatingDial } from './floating-dial/floating-dial';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FloatingDial],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RESQ');
}
