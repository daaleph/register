// frontend/src/contexts/Entities.tsx
import { HttpUtility } from "@/services";

export abstract class Prioritizer {
    #summary: any;
    #priorities: any;
    protected rawData: any;
    protected isInitialized: boolean = false;
    protected abstract readonly endPoint: string;
    private readonly FIFTEEN_DAYS: number = 15 * 24 * 60 * 60 * 1000;

    constructor() {
        this.#summary = null;
        this.#priorities = null;
    }
    
    public async initialize(): Promise<void> {
        if (this.isInitialized) return;
        
        await this.initializeDependencies();

        if (this.isCacheValid()) {
            this.loadFromCache();
        } else {
            this.rawData = await this.fetchData();
            this.processData();
            this.saveToCache();
        }
        this.isInitialized = true;
    }
    
    protected abstract initializeDependencies(): Promise<void>;
    
    protected async fetchData(): Promise<any> {
        return await HttpUtility.get(this.endPoint);
    }
    
    protected processData(): void {
        this.#summary = this.summarize();
        this.#priorities = this.prioritize();
    }
    
    protected abstract summarize(): any;
    protected abstract prioritize(): any;

    public get summary(): any {
        return this.#summary;
    }

    public get priorities(): any {
        return this.#priorities;
    }
    
    private isCacheValid(): boolean {
        const cache = localStorage.getItem(this.cacheKey);
        if (!cache) return false;
        const { timestamp } = JSON.parse(cache);
        const now = new Date().getTime();
        return now - timestamp < this.FIFTEEN_DAYS;
    }

    private loadFromCache(): void {
        const cache = localStorage.getItem(this.cacheKey);
        if (cache) {
            const { data, summary, priorities } = JSON.parse(cache);
            this.rawData = data;
            this.#summary = summary;
            this.#priorities = priorities;
        }
    }

    private saveToCache(): void {
        const cacheData = {
            data: this.rawData,
            summary: this.#summary,
            priorities: this.#priorities,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }
    
    protected abstract get cacheKey(): string;
}