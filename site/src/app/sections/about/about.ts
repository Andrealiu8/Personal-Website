import { Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { ABOUT_CONTENT } from './about.content';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly content = ABOUT_CONTENT;
}
