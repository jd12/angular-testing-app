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

  public searchInput = 'test search 123 456-7890 test@example.com';

  ngOnInit(): void {
    this.parseSearchInputAndFillForms(this.searchInput.trim().split(' '), false);
  }

  public parseSearchInputAndFillForms(tokens: string[], firstNameFilled) {
    // if there are no more tokens, you are done
    console.log(tokens);
    if (tokens.length == 0) {
      return;
    }
    const currentToken = tokens[0];
    const tokenType = this.getTokenType(currentToken);
    // take searchInput and fill out first name if there is a name token
    if (tokenType === 'name') {
        if (!firstNameFilled) {
          tokens = this.parseName(tokens, 'first');
          firstNameFilled = true;
        } else {
          tokens = this.parseName(tokens, 'last');
        }
    } else if (tokenType === 'email') {
      // take searchInput and fill out email if there is an email token
      tokens = this.parseEmail(tokens);
    } else if (tokenType === 'primaryPhone') {
      // take searchInput and fill out phone number if there is a phone number token
      tokens = this.parseNumber(tokens);
    }

    // call function again with remaining tokens
    return this.parseSearchInputAndFillForms(tokens, firstNameFilled);
  }

  public parseName(tokens: string[], nameType: string) {
    const currentToken = tokens[0];
    if (nameType === 'first') {
      this.fillField("firstName", tokens[0]);
    } else {
      // take searchInput and fill out last name if there is a name token
      this.fillField("lastName", tokens[0]);
    }
    return tokens.filter(token => token !== currentToken);
  }

  public parseNumber(tokens: string[]) {
    let phoneNumberTokens = [];
    let tokensToRemove = [];
    for (let token of tokens) {
      if (this.couldBePhoneNumber(token)) {
        phoneNumberTokens = phoneNumberTokens.concat(this.tokenizeNumber(token));
        tokensToRemove.push(token);
      }
    }
    this.fillField('primaryPhone', this.transformNumber(phoneNumberTokens));
    return tokens.filter(token => !tokensToRemove.includes(token));
  }

  private tokenizeNumber(token: string) {
    // Replace (, ), and - with space
    token = token.replace(new RegExp('[\(\)-]'), ' ');
    // Need to take out leading and trailing whitespace
    // in order to properly split
    token = token.trim();
    if (token.includes(' ')) {
      return token.split(' ');
    }
    return [token];
  }

  public transformNumber(tokens) {
    let result = '';
    // if (tokens.length > 0) {
    //   result += '(' + tokens[0] + ')';
    // }
    // if (tokens.length > 1) {
    //   result += ' ' + tokens[1];
    // }
    // if (tokens.length > 2) {
    //   result += '-' + tokens[2];
    // }
    const merge = [
    area => '(' + area + ')',
    first => ' ' + first,
    last => '-' + last
  ]
    return tokens.map(numb => merge.shift()(numb)).join('');
  }

  public parseEmail(tokens: string[]) {
    const currentToken = tokens[0];
    this.fillField("email", tokens[0]);
    return tokens.filter(token => token !== currentToken);
  }

  public fillField(element_id: string, newValue: string) {
    document.getElementById(element_id).setAttribute("value", newValue);
  }

  public getTokenType(token: string) {
    if (this.couldBeEmail(token)) {
        return 'email';
    }
    if (this.couldBePhoneNumber(token)) {
        return 'primaryPhone';
    }
    if (this.couldBeName(token)) {
        return 'name';
    }
    return new Error(token + ' is an Invalid Token Type');
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
