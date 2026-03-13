import { Component } from '@angular/core';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-about',
  imports: [FadeUpDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
