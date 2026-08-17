import { Component, inject } from '@angular/core';
import { Nav } from './core/nav/nav';
import { Footer } from './core/footer/footer';
import { Seo } from './core/seo';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Service } from './sections/service/service';
import { Videos } from './sections/videos/videos';
import { Contact } from './sections/contact/contact';
import { TEACHING_CONTENT, WEDDINGS_CONTENT } from './sections/service/service.content';

@Component({
  selector: 'app-root',
  imports: [Nav, Footer, Hero, About, Service, Videos, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly teaching = TEACHING_CONTENT;
  protected readonly weddings = WEDDINGS_CONTENT;

  constructor() {
    inject(Seo).apply();
  }
}
