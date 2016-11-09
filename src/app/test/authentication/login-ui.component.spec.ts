import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {LoginUIComponent, INVALID_LOGIN_MESSAGE} from "../../authentication/login-ui.component";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../authentication/login.service";

describe('LoginUI', () => {

  xit('Should display a message if login/password not correct', fakeAsync(inject([ActivatedRoute, Http], (activatedRoute, http) => {

    let fixture = TestBed.createComponent(LoginUIComponent);

    let inputElementPassword = fixture.debugElement.nativeElement.querySelector('input[name="password"]');
    let inputElementLogin = fixture.debugElement.nativeElement.querySelector('input[name="login"]');
    let inputElementLoginButton = fixture.debugElement.nativeElement.querySelector('button[name="loginButton"]');
    let inputElementMessage = fixture.debugElement.nativeElement.querySelector('span[name="message"]');

    spyOn(fixture.componentInstance, 'handleInputChange');

    spyOn(LoginService,login).and.returnValue(new Promise((resolve, reject) => {
      resolve(
        return new Promise(resolve => resolve(false));
      )
    }));

    let mokLoginService = new LoginService(null);
    mokLoginService.login('patricerolland@yahoo.fr', 'toto')

    inputElementLoginButton.dispatchEvent(new Event('onClick'));

    expect((<jasmine.Spy>fixture.componentInstance.handleInputChange).calls.count()).toEqual(1);
    expect(inputElementMessage).toEqual(INVALID_LOGIN_MESSAGE);

  }));

  xit('Should redirect to image list if login/password is correct', () => {
    // TODO
  });

});
