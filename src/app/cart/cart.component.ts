import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { ApiService } from '../api.service';
import { Module } from '../interfaces/module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  items = this.cart.items;
  availableModules: Module[] = [];
  isOpen = true;

  constructor(
    private cart: CartService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getModules().subscribe(allModules => {
      this.availableModules = allModules;
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  hasAllClusters(): boolean {
    return this.cart.hasAllClusters();
  }

  makeOrder(): void {
    try {
      const orderedModules = this.cart.order();
      console.log(orderedModules);
    } catch (error) {
      console.log(error);
    }
  }
}
