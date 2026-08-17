import { Component } from '@angular/core';
import { CONTACT_CONFIG } from '../../sections/contact/contact.content';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly config = CONTACT_CONFIG;
  /** Prerendered at build time, so this is the build year, not "now". */
  protected readonly year = new Date().getFullYear();
}
