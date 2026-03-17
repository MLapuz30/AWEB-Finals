import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HotlineService, Hotline } from '../services/hotline.service';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-directory',
  imports: [FormsModule, FadeUpDirective],
  templateUrl: './directory.html',
  styleUrl: './directory.css',
})
export class Directory implements OnInit {
  searchTerm = '';
  activeCategory = 'All';
  savedIds = new Set<string>();
  allHotlines: Hotline[] = [];
  filteredHotlines: Hotline[] = [];

  categories = [
    { key: 'All',       label: 'All Services' },
    { key: 'Police',    label: 'Police'       },
    { key: 'Fire',      label: 'Fire'         },
    { key: 'Hospital',  label: 'Hospital'     },
    { key: 'Ambulance', label: 'Ambulance'    },
    { key: 'Barangay',  label: 'Barangay'     },
  ];

  constructor(private svc: HotlineService, private sanitizer: DomSanitizer) {}

ngOnInit(): void {
  this.svc.getAll().subscribe(data => {
    this.allHotlines = data;
    this.applyFilter();
  });
  this.svc.clearCache();
  this.svc.getAll().subscribe(data => {
    this.allHotlines = data;
    this.applyFilter();
  });
}

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredHotlines = this.allHotlines.filter(h => {
      const inCategory = this.activeCategory === 'All' || h.category === this.activeCategory;
      const inSearch = !term ||
        h.name.toLowerCase().includes(term) ||
        h.location.toLowerCase().includes(term) ||
        h.phone.includes(term);
      return inCategory && inSearch;
    });
  }

  setCategory(key: string): void {
    this.activeCategory = key;
    this.applyFilter();
  }

  toggleSave(id: string): void {
    if (this.savedIds.has(id)) {
      this.savedIds.delete(id);
    } else {
      this.savedIds.add(id);
    }
  }

  isSaved(id: string): boolean {
    return this.savedIds.has(id);
  }

  getPhoneHref(phone: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('tel:' + phone.replace(/[^\d+]/g, ''));
  }

  saveContact(hotline: Hotline): void {
    let vcf = 'BEGIN:VCARD\r\n';
    vcf += 'VERSION:3.0\r\n';
    vcf += `FN:${hotline.name}\r\n`;
    vcf += `TEL:${hotline.phone}\r\n`;
    if (hotline.location) {
      vcf += `ADR:;;${hotline.location};;;;\r\n`;
    }
    vcf += 'END:VCARD\r\n';

    const blob = new Blob([vcf], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hotline.name.replace(/[^a-z0-9]/gi, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  get savedCount(): number {
    return this.savedIds.size;
  }

  saveAllBookmarked(): void {
    const saved = this.allHotlines.filter(h => this.savedIds.has(h._id!));
    if (saved.length === 0) {
      document.getElementById('hotline-list')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const vcf = saved.map(h => {
      let card = 'BEGIN:VCARD\r\n';
      card += 'VERSION:3.0\r\n';
      card += `FN:${h.name}\r\n`;
      card += `TEL:${h.phone}\r\n`;
      if (h.location) {
        card += `ADR:;;${h.location};;;;\r\n`;
      }
      card += 'END:VCARD\r\n';
      return card;
    }).join('');

    const blob = new Blob([vcf], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Emergency_Contacts.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  scrollToList(): void {
    document.getElementById('hotline-list')?.scrollIntoView({ behavior: 'smooth' });
  }
}