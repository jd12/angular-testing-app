import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  namePattern = new RegExp("^([A-Za-z'-]+)$");
  public couldBeName(token: string) {
    return this.namePattern.test(token);
  }
}
