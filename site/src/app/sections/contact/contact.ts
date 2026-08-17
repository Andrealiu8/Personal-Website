import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reveal } from '../../core/reveal';
import { InquiryIntent } from '../../core/inquiry-intent';
import { CONTACT_CONFIG, CONTACT_CONTENT } from './contact.content';

type SubmitState = 'idle' | 'sending' | 'sent' | 'failed';

interface FieldError {
  readonly control: string;
  readonly message: string;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly intent = inject(InquiryIntent);
  private readonly injector = inject(Injector);

  private readonly summary = viewChild<ElementRef<HTMLElement>>('summary');

  protected readonly content = CONTACT_CONTENT;
  protected readonly config = CONTACT_CONFIG;

  protected readonly state = signal<SubmitState>('idle');
  /** Errors are only surfaced after a submit attempt, not while typing. */
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    inquiryType: ['other'],
    eventDate: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    _gotcha: [''], // honeypot; real people leave it empty
  });

  /** True when there is no Formspree id yet, so sending is impossible. */
  protected readonly canSend = computed(() => this.config.formspreeId !== null);

  protected readonly errors = signal<readonly FieldError[]>([]);

  constructor() {
    // Preselect the inquiry type when the visitor arrived via a section CTA.
    effect(() => {
      const type = this.intent.type();
      if (type !== 'other') {
        this.form.controls.inquiryType.setValue(type);
      }
    });
  }

  protected showError(control: keyof typeof this.form.controls): boolean {
    const field = this.form.controls[control];
    return this.submitted() && field.invalid;
  }

  protected errorFor(control: 'name' | 'email' | 'message'): string {
    const field = this.form.controls[control];
    if (!field.errors) return '';
    if (field.errors['required']) {
      return {
        name: 'Please enter your name.',
        email: 'Please enter your email address.',
        message: 'Please tell me a little about what you need.',
      }[control];
    }
    if (field.errors['email']) {
      return 'That email address does not look right — check for a typo.';
    }
    if (field.errors['minLength'] || field.errors['minlength']) {
      return 'Please add a little more detail (at least 10 characters).';
    }
    return 'Please check this field.';
  }

  protected async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.collectErrors();
      // Focus the summary, which links to each invalid field; inline messages
      // stay in place beside their inputs.
      //
      // This must wait for the next render: the summary carries [hidden] while
      // there are no errors, and a hidden element cannot take focus. Under
      // zoneless change detection the DOM has not caught up by the time this
      // line runs, so focusing here directly silently does nothing.
      afterNextRender(() => this.summary()?.nativeElement.focus(), { injector: this.injector });
      return;
    }

    this.errors.set([]);

    if (!this.canSend()) {
      this.state.set('failed');
      return;
    }

    this.state.set('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${this.config.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(this.form.getRawValue()),
      });

      if (!response.ok) {
        throw new Error(`Formspree responded ${response.status}`);
      }

      this.state.set('sent');
      this.form.reset({ inquiryType: 'other' });
      this.submitted.set(false);
    } catch {
      this.state.set('failed');
    }
  }

  private collectErrors(): void {
    const labels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      message: 'Message',
    };

    this.errors.set(
      Object.keys(labels)
        .filter((key) => this.form.controls[key as 'name'].invalid)
        .map((key) => ({
          control: key,
          message: `${labels[key]}: ${this.errorFor(key as 'name')}`,
        })),
    );
  }
}
