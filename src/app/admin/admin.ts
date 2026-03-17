import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HotlineService, Hotline } from '../services/hotline.service';
import { FadeUpDirective } from '../fade-up.directive';
import { ChangeDetectorRef } from '@angular/core';

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
export class Admin implements OnInit {
  // ── Auth ──
  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;
  showLoginSuccess = false;

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
  editingId: string | null = null;
  formData = { name: '', category: 'Police', phone: '', location: '', availability: '24/7' };

  constructor(private svc: HotlineService, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sync();
  }

private sync(): void {
  this.svc.clearCache();
  this.svc.getAll().subscribe(data => {
    this.hotlines = data;
    this.cdr.detectChanges();
  });
}

  // ── Auth methods ──
login() {
  this.http.post('http://localhost:3000/api/auth/login', {
    username: this.username,
    password: this.password
  }).subscribe({
    next: () => {
      this.errorMessage = '';
      this.isLoggedIn = true;
      this.showLoginSuccess = true;
      this.cdr.detectChanges();
      setTimeout(() => { this.showLoginSuccess = false; }, 3000);
    },
    error: () => {
      this.errorMessage = 'Invalid username or password. Please try again.';
      this.cdr.detectChanges();
      setTimeout(() => { this.errorMessage = ''; }, 3000);
    }
  });
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
    this.editingId = h._id!;
    this.formData = { name: h.name, category: h.category, phone: h.phone, location: h.location, availability: h.availability };
    this.showAddForm = true;
  }

saveHotline() {
  if (!this.formData.name.trim()) return;
  if (this.editingId !== null) {
    this.svc.update(this.editingId, this.formData).subscribe(() => {
      this.cancelForm();
      this.sync();
    });
  } else {
    this.svc.add(this.formData).subscribe(() => {
      this.cancelForm();
      this.sync();
    });
  }
}
  cancelForm() {
    this.showAddForm = false;
    this.editingId = null;
    this.formData = { name: '', category: 'Police', phone: '', location: '', availability: '24/7' };
  }

// ── Delete Modal ──
showDeleteModal = false;
deleteTargetId: string | null = null;
deleteTargetName = '';

openDeleteModal(id: string, name: string) {
  this.deleteTargetId = id;
  this.deleteTargetName = name;
  this.showDeleteModal = true;
}

confirmDelete() {
  if (!this.deleteTargetId) return;
  this.hotlines = this.hotlines.filter(h => h._id !== this.deleteTargetId);
  this.svc.remove(this.deleteTargetId).subscribe(() => {
    this.svc.clearCache();
  });
  
  this.closeDeleteModal();
}

closeDeleteModal() {
  this.showDeleteModal = false;
  this.deleteTargetId = null;
  this.deleteTargetName = '';
}

  getBarWidth(calls: number): string {
    return `${Math.round((calls / 342) * 100)}%`;
  }
}