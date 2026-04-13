import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  private _isIdle = signal(false);
  public readonly isIdle: Signal<boolean> = this._isIdle;
  private _isWarning = signal(false);
  public readonly isWarning: Signal<boolean> = this._isWarning;

  private _countDownSeconds = signal(0);
  public readonly countDownSeconds: Signal<number> = this._countDownSeconds;

  private readonly IDLE_MS = 30_000;
  private readonly WARNING_MS = 10_000;

  private idleTimeOutId?: number;
  private warningTimeOutId?: number;
  private countDownInternalId?: number;
  private isActive = false;
  private reSetTimeBound = () => this.reSetTimer();

  /**
   *
   */
  constructor() {
    const events = ['mouse', 'keydown', 'mousedown', 'touchstart', 'click'];
    for (const ev of events) {
      window.addEventListener(ev, this.reSetTimeBound, { passive: true });

    }

  }

  public start(): void {
    if (this.isActive)
      return;
    this.isActive = true;
    this.reSetTimer();


  }
  public stop(): void {
    this.isActive == false;
    this.clearTimers();
    this._isIdle.set(false);
    this._isWarning.set(false);
    this._countDownSeconds.set(0);
  }
  public reSetTimer() {


  }

  clearTimers() {


  }

}
