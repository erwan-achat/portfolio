import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './info/route-animations';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { FaviconService } from './services/favicon/favicon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimations],
})
export class App {
  constructor(private faviconService: FaviconService) {}

  ngOnInit(): void {
    this.faviconService.initFaviconListener();
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated ? outlet.activatedRoute.snapshot.url.join('/') : '';
  }
}
