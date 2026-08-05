import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './info/route-animations';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { FirstVisitOverlay } from "./components/first-visit-overlay/first-visit-overlay";
import { FaviconService } from './services/favicon/favicon';
import { Medusae } from './components/medusae/medusae';

const FIRST_VISIT_LS_KEY = 'portfolio-first-visit-seen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, FirstVisitOverlay, Medusae],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimations],
})
export class App {
  protected readonly showOverlay = signal(!localStorage.getItem(FIRST_VISIT_LS_KEY));

  constructor(private faviconService: FaviconService) {}

  ngOnInit(): void {
    this.faviconService.initFaviconListener();
  }

  onOverlayDone() {
    localStorage.setItem(FIRST_VISIT_LS_KEY, 'true');
    this.showOverlay.set(false);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated ? outlet.activatedRoute.snapshot.url.join('/') : '';
  }
}
