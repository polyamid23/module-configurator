import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

import { Module, Cluster } from '../interfaces/module';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add module to cart', () => {
    const mod: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    service.add(mod);
    expect(service.items).toContain(mod);
  });

  it('should not add the same module to cart twice', () => {
    const mod: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    service.add(mod);
    service.add(mod);

    expect(service.items).toContain(mod);
    expect(service.items.length).toBe(1);
  });

  it('should throw error when trying to order without all clusters', () => {
    const mod1: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    const mod2: Module = {
      id: 2,
      name: 'Module 2',
      cluster: 'FMEA',
      description: 'Description 2'
    };

    service.add(mod1);
    service.add(mod2);

    expect(() => service.order()).toThrowError('Not all clusters are selected');
  });

  it('should return all ordered modules if all clusters are selected', () => {
    const clusters: Cluster[] = ['FMEA', 'Control-Plan', 'Fertigungsprüfung', 'Reklamationsmanagement', 'Maßnahmenmanagement'];

    clusters.forEach((cluster, idx) => {
      let mod: Module = {
        id: idx,
        name: `Module ${idx}`,
        cluster,
        description: 'Description 1'
      };

      service.add(mod);
    });

    expect(service.order().length).toBe(5);
  });

  it('should remove module from cart', () => {
    const mod: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    service.add(mod);
    service.remove(mod);

    expect(service.items).not.toContain(mod);
    expect(service.items.length).toBe(0);
  });

  it('should move module up', () => {
    const mod1: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    const mod2: Module = {
      id: 2,
      name: 'Module 2',
      cluster: 'FMEA',
      description: 'Description 2'
    };

    service.add(mod1);
    service.add(mod2);

    service.moveUp(mod2);

    expect(service.items[0]).toBe(mod2);
    expect(service.items[1]).toBe(mod1);
  });

  it('should move module down', () => {
    const mod1: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    const mod2: Module = {
      id: 2,
      name: 'Module 2',
      cluster: 'FMEA',
      description: 'Description 2'
    };

    service.add(mod1);
    service.add(mod2);

    service.moveDown(mod1);

    expect(service.items[0]).toBe(mod2);
    expect(service.items[1]).toBe(mod1);
  });

  it('should return true if module is first', () => {
    const mod1: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    const mod2: Module = {
      id: 2,
      name: 'Module 2',
      cluster: 'FMEA',
      description: 'Description 2'
    };

    service.add(mod1);
    service.add(mod2);

    expect(service.isFirst(mod1)).toBe(true);
    expect(service.isFirst(mod2)).toBe(false);
  });

  it('should return true if module is last', () => {
    const mod1: Module = {
      id: 1,
      name: 'Module 1',
      cluster: 'FMEA',
      description: 'Description 1'
    };

    const mod2: Module = {
      id: 2,
      name: 'Module 2',
      cluster: 'FMEA',
      description: 'Description 2'
    };

    service.add(mod1);
    service.add(mod2);

    expect(service.isLast(mod1)).toBe(false);
    expect(service.isLast(mod2)).toBe(true);
  });
});
