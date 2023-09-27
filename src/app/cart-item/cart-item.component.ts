import { Component, Input } from '@angular/core';
import { Module } from '../interfaces/module';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})


export class CartItemComponent {
  @Input() item?: Module;

  constructor(private cart: CartService) { }

  removeFromCart(module: Module): void {
    this.cart.remove(module);
  }

  isFirst(module: Module): boolean {
    return this.cart.isFirst(module);
  }

  isLast(module: Module): boolean {
    return this.cart.isLast(module);
  }

  moveUp(module: Module): void {
    this.cart.moveUp(module);
  }

  moveDown(module: Module): void {
    this.cart.moveDown(module);
  }
}

