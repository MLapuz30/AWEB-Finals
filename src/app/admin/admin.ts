import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotlineService, Hotline } from '../services/hotline.service';
import { FadeUpDirective } from '../fade-up.directive';

interface MostUsedItem {
  name: string;
  calls: number;
  trend: 'up' | 'flat';
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule, FadeUpDirective],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  // ── Auth ──
  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;
  showLoginSuccess = false;

  private readonly VALID_USER = 'User123';
  private readonly VALID_PASS = 'Pass123';

  // ── Dashboard ──
  activeTab: 'statistics' | 'manage' = 'statistics';

  mostUsed: MostUsedItem[] = [
    { name: 'Angeles University Foundation Medical Center', calls: 342, trend: 'up' },
    { name: 'Red Cross - Pampanga Chapter', calls: 287, trend: 'up' },
    { name: 'Angeles City Police Station', calls: 243, trend: 'flat' },
    { name: 'Bureau of Fire Protection - Angeles City', calls: 198, trend: 'up' },
    { name: 'Angeles City Rescue Unit', calls: 156, trend: 'flat' },
  ];

  hotlines: Hotline[] = [];

  categories = ['Police', 'Fire', 'Hospital', 'Ambulance', 'Barangay'];

  showAddForm = false;
  editingId: number | null = null;
  formData = { name: '', category: 'Police', phone: '', location: '', availability: '24/7' };

  constructor(private svc: HotlineService) {
    this.hotlines = this.svc.getAll();
  }

  private sync(): void {
    this.hotlines = this.svc.getAll();
  }

  // ── Auth methods ──
  login() {
    if (this.username === this.VALID_USER && this.password === this.VALID_PASS) {
      this.errorMessage = '';
      this.isLoggedIn = true;
      this.showLoginSuccess = true;
      setTimeout(() => { this.showLoginSuccess = false; }, 3000);
    } else {
      this.errorMessage = 'Invalid username or password. Please try again.';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.activeTab = 'statistics';
    this.showAddForm = false;
    this.editingId = null;
  }

  // ── Tab ──
  setManageTab() {
    this.activeTab = 'manage';
    this.showAddForm = false;
    this.editingId = null;
  }

  // ── Hotline CRUD ──
  openAddForm() {
    this.editingId = null;
    this.formData = { name: '', category: 'Police', phone: '', location: '', availability: '24/7' };
    this.showAddForm = true;
  }

  openEditForm(h: Hotline) {
    this.editingId = h.id;
    this.formData = { name: h.name, category: h.category, phone: h.phone, location: h.location, availability: h.availability };
    this.showAddForm = true;
  }

  saveHotline() {
    if (!this.formData.name.trim()) return;
    if (this.editingId !== null) {
      this.svc.update(this.editingId, this.formData);
    } else {
      this.svc.add(this.formData);
    }
    this.sync();
    this.cancelForm();
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingId = null;
    this.formData = { name: '', category: 'Police', phone: '', location: '', availability: '24/7' };
  }

  deleteHotline(id: number) {
    this.svc.remove(id);
    this.sync();
  }

  // ── Helpers ──
  getBarWidth(calls: number): string {
    return `${Math.round((calls / 342) * 100)}%`;
  }
}
