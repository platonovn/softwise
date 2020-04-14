import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHelloComponent } from './app-hello.component';

describe('HelloComponent', () => {
  let component: AppHelloComponent;
  let fixture: ComponentFixture<AppHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
