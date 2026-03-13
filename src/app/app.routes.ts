import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Directory } from './directory/directory';
import { Contact } from './contact/contact';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about', component: About},
  { path: 'directory', component: Directory},
  { path: 'contact', component: Contact},
  { path: 'admin', component: Admin}
];