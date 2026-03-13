import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotlineService, Hotline } from '../services/hotline.service';
import { FadeUpDirective } from '../fade-up.directive';

@Component({
  selector: 'app-directory',
  imports: [FormsModule, FadeUpDirective],
  templateUrl: './directory.html',
  styleUrl: './directory.css',
})
export class Directory {
  searchTerm = '';
  activeCategory = 'All';
  savedIds = new Set<number>();

  categories = [
    { key: 'All',       label: 'All Services' },
    { key: 'Police',    label: 'Police'       },
    { key: 'Fire',      label: 'Fire'         },
    { key: 'Hospital',  label: 'Hospital'     },
    { key: 'Ambulance', label: 'Ambulance'    },
    { key: 'Barangay',  label: 'Barangay'     },
  ];

  constructor(private svc: HotlineService) {}

  get filteredHotlines(): Hotline[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.svc.getAll().filter(h => {
      const inCategory = this.activeCategory === 'All' || h.category === this.activeCategory;
      const inSearch = !term ||
        h.name.toLowerCase().includes(term) ||
        h.location.toLowerCase().includes(term) ||
        h.phone.includes(term);
      return inCategory && inSearch;
    });
  }

  toggleSave(id: number): void {
    if (this.savedIds.has(id)) {
      this.savedIds.delete(id);
    } else {
      this.savedIds.add(id);
    }
  }

  isSaved(id: number): boolean {
    return this.savedIds.has(id);
  }

  getPhoneHref(phone: string): string {
    return 'tel:' + phone.replace(/[^\d+]/g, '');
  }

  scrollToList(): void {
    document.getElementById('hotline-list')?.scrollIntoView({ behavior: 'smooth' });
  }
}
