import { effect, Injectable, signal } from '@angular/core';

export interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _toast = signal<ToastMessage | null>(null);
  toast = this._toast.asReadonly();

  constructor() {
    effect(() => {
      if (this.toast()) {
        setTimeout(() => this.clear(), 3000);
      }
    });
  }

  show(message: string, type: ToastMessage['type'] = 'info') {
    this._toast.set({ message, type });
  }

  clear() {
    this._toast.set(null);
  }
}
