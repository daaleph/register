import hooks from "@/data/hooks";

type HookEntry = [string, string, string];

interface HooksDictionary {
  [key: string]: HookEntry;
}

class HookManager {

  private static instance: HookManager;
  private static STORAGE_KEY = 'availableHooks';
  private availableKeys: string[];
  private hooks: HooksDictionary;

  private constructor() {
    this.hooks = hooks;
    this.availableKeys = Object.keys(this.hooks);
    this.loadState();
  }

  public static getInstance(): HookManager {
    if (!HookManager.instance) {
      HookManager.instance = new HookManager();
    }
    return HookManager.instance;
  }

  private loadState(): void {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(HookManager.STORAGE_KEY);
      this.availableKeys = savedState ? JSON.parse(savedState) : Object.keys(this.hooks);
    } else {
      this.availableKeys = Object.keys(this.hooks);
    }
  }

  private saveState(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(HookManager.STORAGE_KEY, JSON.stringify(this.availableKeys));
    }
  }

  public getRandomHook(): { key: string; hook: string; method: string, description: string } {
    if (this.availableKeys.length === 0) {
      this.availableKeys = Object.keys(this.hooks);
    }

    const randomIndex = Math.floor(Math.random() * this.availableKeys.length);
    const selectedKey = this.availableKeys[randomIndex];
    this.availableKeys.splice(randomIndex, 1);
    
    this.saveState();
    
    return {
      key: selectedKey,
      hook: this.hooks[selectedKey][0],
      method: this.hooks[selectedKey][1],
      description: this.hooks[selectedKey][2]
    };
  }

  public getRemainingCount(): number {
    return this.availableKeys.length;
  }

  public getTotalCount(): number {
    return Object.keys(this.hooks).length;
  }

}

export const hookManager = HookManager.getInstance();