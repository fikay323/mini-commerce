import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterOutlet, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-header', standalone: true, template: '' })
class MockHeaderComponent {}

@Component({ selector: 'app-toast', standalone: true, template: '' })
class MockToastComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        MockHeaderComponent,
        MockToastComponent
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'mini-commerce' title`, () => {
    expect(component.title).toEqual('mini-commerce');
  });

  it('should render the header component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render the toast component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-toast')).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
