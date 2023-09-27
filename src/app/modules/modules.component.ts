import { Component, Input } from '@angular/core';
import { Module } from '../interfaces/module';
import { ApiService } from '../api.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})

export class ModulesComponent {
  @Input() style?: string = 'all';
  clusters: string[] = [];
  modules: Module[] = [];

  constructor(
    private api: ApiService,
    private cart: CartService
  ) { }

  addToCart(module: Module): void {
    this.cart.add(module);
  }

  initializeModules(): void {
    this.api.getModules().subscribe(allModules => {
      this.modules = allModules.sort((a, b) => a.name.localeCompare(b.name));
      this.clusters = [...new Set(allModules.map(module => module.cluster))].sort();
    });
  }

  ngOnInit(): void {
    this.initializeModules();
  }
}
