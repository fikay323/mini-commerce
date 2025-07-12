import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessComponent } from './success.component';
import { provideRouter } from '@angular/router';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let localStorageGetItemSpy: jasmine.Spy;

  beforeEach(async () => {
    localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'lastOrderId') {
        return 'MOCK_ORDER_123';
      }
      return null;
    });

    await TestBed.configureTestingModule({
      imports: [
        SuccessComponent
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve orderId from localStorage on ngOnInit', () => {
    expect(localStorageGetItemSpy).toHaveBeenCalledWith('lastOrderId');
    expect(component.orderId).toBe('MOCK_ORDER_123');
  });
});
