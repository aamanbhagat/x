export class GameTimer {
  private interval: NodeJS.Timeout | null = null;
  private remaining: number = 0;
  private isPaused: boolean = false;
  private onTickCallback: ((remaining: number) => void) | null = null;
  private onExpireCallback: (() => void) | null = null;

  start(
    duration: number,
    onTick: (remaining: number) => void,
    onExpire: () => void
  ): void {
    this.remaining = duration;
    this.isPaused = false;
    this.onTickCallback = onTick;
    this.onExpireCallback = onExpire;

    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.remaining = Math.max(0, this.remaining - 1);
        
        if (this.onTickCallback) {
          this.onTickCallback(this.remaining);
        }

        if (this.remaining === 0) {
          this.stop();
          if (this.onExpireCallback) {
            this.onExpireCallback();
          }
        }
      }
    }, 1000);
  }

  pause(): number {
    this.isPaused = true;
    return this.remaining;
  }

  resume(fromTime?: number): void {
    if (fromTime !== undefined) {
      this.remaining = fromTime;
    }
    this.isPaused = false;
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset(): void {
    this.stop();
    this.remaining = 0;
    this.isPaused = false;
  }

  getRemaining(): number {
    return this.remaining;
  }

  isPausedState(): boolean {
    return this.isPaused;
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
