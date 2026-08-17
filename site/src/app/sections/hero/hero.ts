import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HERO_CONTENT } from './hero.content';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = HERO_CONTENT;
}
