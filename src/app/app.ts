import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './info/route-animations';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { SplashScreen } from "./components/splash-screen/splash-screen";
import { FaviconService } from './services/favicon/favicon';

const SPLASH_LS_KEY = 'portfolio-splash-seen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, SplashScreen],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimations],
})
export class App {
  protected readonly showSplash = signal(!localStorage.getItem(SPLASH_LS_KEY));

  constructor(private faviconService: FaviconService) {}

  ngOnInit(): void {
    this.faviconService.initFaviconListener();
  }

  onSplashDone() {
    localStorage.setItem(SPLASH_LS_KEY, 'true');
    this.showSplash.set(false);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated ? outlet.activatedRoute.snapshot.url.join('/') : '';
  }
}
