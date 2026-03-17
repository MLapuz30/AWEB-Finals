import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Hotline {
  _id?: string;
  name: string;
  category: string;
  phone: string;
  location: string;
  availability: string;
}

@Injectable({ providedIn: 'root' })
export class HotlineService {
  private api = 'http://localhost:3000/api/hotlines';
  private cache: Hotline[] | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hotline[]> {
    if (this.cache) return of(this.cache);
    return this.http.get<Hotline[]>(this.api).pipe(
      tap(data => this.cache = data)
    );
  }

  add(data: Omit<Hotline, '_id'>): Observable<Hotline> {
    return this.http.post<Hotline>(this.api, data).pipe(
      tap(() => this.cache = null)
    );
  }

  update(id: string, data: Omit<Hotline, '_id'>): Observable<Hotline> {
    return this.http.put<Hotline>(`${this.api}/${id}`, data).pipe(
      tap(() => this.cache = null)
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap(() => this.cache = null)
    );
  }

  getEmergencyNumber(): string {
    return '911';
  }
  
  clearCache(): void {
  this.cache = null;
}
}