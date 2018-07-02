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

  it('should return true for tokens that match phone number pattern', () => {
    const app = new AppComponent();
    expect(app.couldBePhoneNumber('123')).toBe(true, '123 should be a phone number');
    expect(app.couldBePhoneNumber('(123)')).toBe(true, '(123) should be a phone number');
    expect(app.couldBePhoneNumber('123-456-7890')).toBe(true, 'phone number should be able to contain -');
    expect(app.couldBePhoneNumber('123 456 7890')).toBe(true, 'phone numbers with spaces should be valid');
    expect(app.couldBePhoneNumber('(123) 456-7890')).toBe(true, 'phone number should be able to contain - )');
  });

  it('should return false for tokens that do not match phone number pattern', () => {
    const app = new AppComponent();
    expect(app.couldBePhoneNumber('123johnsmith')).toBe(false, 'numbers cannot contain letters');
    expect(app.couldBePhoneNumber('(123!')).toBe(false, 'Numbers cannot contain special characters');
    expect(app.couldBePhoneNumber('')).toBe(false, 'empty string should return false');
  });

});
