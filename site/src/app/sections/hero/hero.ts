import { Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HERO_CONTENT, HERO_PHOTOS, HeroVariant } from './hero.content';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  /** Which photo to frame. Temporary, for the /alt comparison route. */
  readonly variant = input<HeroVariant>('original');

  protected readonly content = HERO_CONTENT;
  protected readonly photo = computed(() => HERO_PHOTOS[this.variant()]);
}
