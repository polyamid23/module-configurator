import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Module } from '../interfaces/module';

import { ApiService } from '../api.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})

export class ModuleDetailComponent implements OnInit {
  module: Module | undefined;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.getModule();
  }

  getModule(): void {
    this.route.params.subscribe((params) => {
      if (params?.['id']) {
        let id = Number(params['id']);
        this.api.getModule(id).subscribe(module => {
          if (!module) {
            this.location.go('/');
            return;
          }

          this.module = module;
        });
      }
    });
  }

  isInCart(): boolean {
    if (!this.module) {
      return false;
    }

    return this.cart.isInCart(this.module);
  }

  addToCart(): void {
    if (!this.module) {
      return;
    }

    this.cart.add(this.module);
  }

  removeFromCart(): void {
    if (!this.module) {
      return;
    }

    this.cart.remove(this.module);
  }
}
