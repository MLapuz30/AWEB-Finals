import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HotlineService } from '../services/hotline.service';

@Component({
  selector: 'app-floating-dial',
  templateUrl: './floating-dial.html',
  styleUrl: './floating-dial.css',
})
export class FloatingDial {
  private sanitizer = inject(DomSanitizer);
  private svc = inject(HotlineService);

  get dialLink(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('tel:' + this.svc.getEmergencyNumber());
  }
}
