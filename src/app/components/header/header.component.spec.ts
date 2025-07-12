import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DarkModeService } from '../../services/dark-mode.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let darkModeService: DarkModeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [DarkModeService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(DarkModeService);
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode when toggle is called', () => {
    const initialState = darkModeService.isDarkMode();

    darkModeService.toggleTheme();
    const toggledState = darkModeService.isDarkMode();

    expect(toggledState).toBe(!initialState);
  });
});
