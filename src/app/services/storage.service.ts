import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getItem(key: string): Record<string, any> {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem(key));
  }
  public setItem(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  public removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
