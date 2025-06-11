import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {VERSION} from '../../../environment';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly #route = inject(Router);
  readonly version = VERSION;


  navigateTo(route: string): void {
    this.#route.navigate([route]);
  }

}
