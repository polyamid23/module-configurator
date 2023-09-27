import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Module } from './interfaces/module';
import { MODULES } from './mocks/modules';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor() { }

  getModules(): Observable<Module[]> {
    return of(MODULES);
  }

  getModule(id: number): Observable<Module|undefined> {
    return of(MODULES.find(module => module.id === id));
  }

  orderModules(modules: Module[]): Module[] {
    return modules;
  }
}
