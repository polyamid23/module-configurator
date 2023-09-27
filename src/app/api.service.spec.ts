import { TestBed } from '@angular/core/testing';
import { MODULES } from './mocks/modules';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all modules', () => {
    service.getModules().subscribe(modules => {
      expect(modules.length).toBe(MODULES.length);
    });
  });

  it('should return module with id 1', () => {
    service.getModule(1).subscribe(module => {
      expect(module).toBeTruthy();
      expect(module?.id).toBe(1);
    });
  });

  it('should return undefined when module with id 100 does not exist', () => {
    service.getModule(100).subscribe(module => {
      expect(module).toBeFalsy();
    });
  });

  it('should return ordered modules', () => {
    const mod1 = MODULES[0];
    const mod2 = MODULES[1];

    const orderedModules = service.orderModules([mod1, mod2]);

    expect(orderedModules.length).toBe(2);
    expect(orderedModules[0]).toBe(mod1);
    expect(orderedModules[1]).toBe(mod2);
  });
});
