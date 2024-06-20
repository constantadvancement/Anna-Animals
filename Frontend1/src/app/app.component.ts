import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  host: {ngSkipHydration: 'true'},
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: any;
  constructor(private router: Router, private api: ServiceService) {}

  isTabActive(path: string): boolean {
    return this.router.url === path;
  }

}
