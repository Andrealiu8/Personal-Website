import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Reveal } from '../../core/reveal';
import { VIDEOS_CONTENT, VideoItem } from './videos.content';

@Component({
  selector: 'app-videos',
  imports: [Reveal],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly content = VIDEOS_CONTENT;

  /** Ids the visitor has pressed play on. Nothing is requested from YouTube
   *  until then, so the page stays fast and sets no third-party cookies. */
  private readonly playing = signal<ReadonlySet<string>>(new Set());

  protected isPlaying(id: string): boolean {
    return this.playing().has(id);
  }

  protected play(id: string): void {
    this.playing.update((set) => new Set(set).add(id));
  }

  protected thumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  /**
   * Angular blocks iframe[src] bindings unless the value is explicitly
   * trusted. Safe here: ids come from videos.content.ts in this repo, never
   * from user input or a query string, and the host is pinned.
   */
  protected embedUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`,
    );
  }

  protected isPlaceholder(item: VideoItem): boolean {
    return item.youtubeId === null;
  }

  protected isPlaceholderText(text: string): boolean {
    return text.trimStart().startsWith('[');
  }
}
