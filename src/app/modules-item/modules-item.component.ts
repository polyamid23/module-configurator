import { Component, Input } from '@angular/core';
import { Module } from '../interfaces/module';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-modules-item',
  templateUrl: './modules-item.component.html',
  styleUrls: ['./modules-item.component.css']
})

export class ModulesItemComponent {
  @Input() module?: Module;

  constructor(private cart: CartService) { }

  addToCart(module: Module): void {
    this.cart.add(module);
  }

  removeFromCart(module: Module): void {
    this.cart.remove(module);
  }

  isInCart(module: Module): boolean {
    return this.cart.isInCart(module);
  }
}
