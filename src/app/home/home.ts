import { Component } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-home',
  imports: [FadeUpDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
