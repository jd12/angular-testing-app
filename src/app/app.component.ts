import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  namePattern = new RegExp("^([A-Za-z'-]+)$");
  phoneNumberPattern = new RegExp("([0-9\(\)-]+$)");
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  public searchInput = 'Test Search';

  ngOnInit(): void {
    document.getElementById("firstName").setAttribute("value", this.searchInput);
  }

  public couldBeName(token: string) {
    return this.namePattern.test(token);
  }

  public couldBePhoneNumber(token: string) {
    return this.phoneNumberPattern.test(token);
  }

  public couldBeEmail(token: string) {
    return token.includes('@');
  }
}
