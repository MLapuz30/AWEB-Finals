import { Injectable } from '@angular/core';

    export interface Hotline {
    id: number;
    name: string;
    category: string;
    phone: string;
    location: string;
    availability: string;
    }

    @Injectable({ providedIn: 'root' })
    export class HotlineService {
    private hotlines: Hotline[] = [
        // Police
        { id: 1,  name: 'Angeles City Police Station',               category: 'Police',    phone: '(045) 888-2345', location: 'Angeles City',                  availability: '24/7' },
        { id: 2,  name: 'Police Station 1 - Balibago',              category: 'Police',    phone: '(045) 322-4567', location: 'Balibago, Angeles City',         availability: '24/7' },
        { id: 3,  name: 'Police Station 2 - Nepo Quad',             category: 'Police',    phone: '(045) 888-7890', location: 'Nepo Quad, Angeles City',        availability: '24/7' },
        { id: 4,  name: 'Police Station 3 - Clarkfield',            category: 'Police',    phone: '(045) 599-2100', location: 'Clark Freeport Zone',            availability: '24/7' },
        // Fire
        { id: 5,  name: 'Bureau of Fire Protection - Angeles City', category: 'Fire',      phone: '(045) 888-2222', location: 'Angeles City',                  availability: '24/7' },
        { id: 6,  name: 'BFP Fire Station - Clark',                 category: 'Fire',      phone: '(045) 599-5911', location: 'Clark Freeport Zone',            availability: '24/7' },
        { id: 7,  name: 'BFP Fire Station - Mabalacat',             category: 'Fire',      phone: '(045) 331-1234', location: 'Mabalacat City',                availability: '24/7' },
        // Hospital
        { id: 8,  name: 'Angeles University Foundation Medical Center', category: 'Hospital', phone: '(045) 625-1000', location: 'Angeles City',               availability: '24/7' },
        { id: 9,  name: 'Ospital Ning Angeles',                     category: 'Hospital',  phone: '(045) 888-4551', location: 'Angeles City',                  availability: '24/7' },
        { id: 10, name: 'St. Francis Medical Center',               category: 'Hospital',  phone: '(045) 892-3888', location: 'Angeles City',                  availability: '24/7' },
        // Ambulance
        { id: 11, name: 'Red Cross - Pampanga Chapter',             category: 'Ambulance', phone: '(045) 536-4636', location: 'Angeles City',                  availability: '24/7' },
        { id: 12, name: 'Angeles City Rescue Unit',                 category: 'Ambulance', phone: '(045) 322-5678', location: 'Angeles City',                  availability: '24/7' },
        { id: 13, name: 'CDRRMO - Clark Development',               category: 'Ambulance', phone: '(045) 599-2222', location: 'Clark Freeport Zone',            availability: '24/7' },
        // Barangay
        { id: 14, name: 'Barangay Hall - Balibago',                 category: 'Barangay',  phone: '(045) 322-1122', location: 'Balibago, Angeles City',        availability: 'Mon-Sat 8am-5pm' },
        { id: 15, name: 'Barangay Hall - Anunas',                   category: 'Barangay',  phone: '(045) 888-3344', location: 'Anunas, Angeles City',          availability: 'Mon-Sat 8am-5pm' },
        { id: 16, name: 'Barangay Hall - Cutcut',                   category: 'Barangay',  phone: '(045) 888-5566', location: 'Cutcut, Angeles City',          availability: 'Mon-Sat 8am-5pm' },
    ];

    private _nextId = 17;

    getAll(): Hotline[] {
        return [...this.hotlines];
    }

    add(data: Omit<Hotline, 'id'>): void {
        this.hotlines.push({ id: this._nextId++, ...data });
    }

    update(id: number, data: Omit<Hotline, 'id'>): void {
        const idx = this.hotlines.findIndex(h => h.id === id);
        if (idx > -1) this.hotlines[idx] = { id, ...data };
    }

    remove(id: number): void {
        this.hotlines = this.hotlines.filter(h => h.id !== id);
    }

    getEmergencyNumber(): string {
        return '911';
    }
    }