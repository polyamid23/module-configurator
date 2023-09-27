import { Injectable } from '@angular/core';
import { Module } from '../interfaces/module';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Module[] = [];
  numberAllClusters: number = 0;

  constructor(private api: ApiService) {
    this.api.getModules().subscribe(allModules => {
      this.numberAllClusters = [...new Set(allModules.map(module => module.cluster))].length;
    })
  }

  add(module: Module): void {
    if (!this.isInCart(module)) {
      this.items.push(module);
    }
  }

  remove(module: Module): void {
    const index = this.items.indexOf(module);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  isInCart(module: Module): boolean {
    return this.items.includes(module);
  }

  hasAllClusters(): boolean {
    let clusters = [...new Set(this.items.map(module => module.cluster))];

    return clusters.length === this.numberAllClusters;
  }

  isFirst(module: Module): boolean {
    return this.items.indexOf(module) === 0;
  }

  isLast(module: Module): boolean {
    return this.items.indexOf(module) === this.items.length - 1;
  }

  moveUp(module: Module): void {
    const index = this.items.indexOf(module);

    if (index > 0) {
      this.items.splice(index, 1);
      this.items.splice(index - 1, 0, module);
    }
  }

  moveDown(module: Module): void {
    const index = this.items.indexOf(module);

    if (index < this.items.length - 1) {
      this.items.splice(index, 1);
      this.items.splice(index + 1, 0, module);
    }
  }

  order(): Module[] {
    if (!this.hasAllClusters()) {
      throw new Error('Not all clusters are selected');
    }

    return this.api.orderModules(this.items);
  }
}
