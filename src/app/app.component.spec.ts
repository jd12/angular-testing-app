import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to my-app!');
  }));

  it('should return true for names that match name pattern', () => {
    const app = new AppComponent();
    expect(app.couldBeName('John')).toBe(true, 'John should be a valid name');
    expect(app.couldBeName('o\'rourke')).toBe(true, 'Names with \' should be a valid name');
    expect(app.couldBeName('DeVaughn-Brown')).toBe(true, 'Names with - should be a valid name');
  });

  it('should return false for names that do not match name pattern', () => {
    const app = new AppComponent();
    expect(app.couldBeName('John123')).toBe(false, 'Strings with numbers are not valid names');
    expect(app.couldBeName('John!')).toBe(false, 'Strings with special characters are not valid names');
    expect(app.couldBeName('John Smith')).toBe(false, 'Names cannot contain spaces');
  });

});
