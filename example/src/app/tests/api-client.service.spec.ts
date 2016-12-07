/* tslint:disable:no-unused-variable */
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiClientService } from '../../../../lib/api-client.service';
import { ApigClientFactory } from '../../../../lib/apig-client-factory';
import { AwsService } from '../../../../lib/aws.service';
import { UserService } from '../../../../lib/user.service';

class AwsServiceStub {
  
}

const unauthenticatedClient = {
  auth: false
}

const authenticatedClient = {
  auth: true
}

const apigClientFactoryStub = {
  newClient: function(credentials) {
    
    if(credentials) {
      return authenticatedClient;
    } else {
      return unauthenticatedClient;
    }

  }
}

@Injectable()
class UserServiceStub {
  auth = "test";
  //$auth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public stub = true;

  constructor() { }

  login(username, password) {
    //this.$auth.next(true);
  }

  logout() {
    //this.$auth.next(false);
  }

  isStub() {
    return this.stub;
  }
}

describe('Service: ApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AwsService, useValue: AwsServiceStub },
        { provide: ApigClientFactory, useValue: apigClientFactoryStub},
        //{ provide: UserService, useValue: UserServiceStub },
        UserService
      ]
    });
  });

  it('should ...', inject([ ApiClientService ], (service: ApiClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the injected apigClientFactory', inject([ ApiClientService ], (service: ApiClientService) => {

    service.$client.subscribe((client) => {
      expect(client).toEqual(unauthenticatedClient);
    });
  
  }));

  it('should get the injected apigClientFactory', inject([ ApiClientService ], (service: ApiClientService) => {

    service.$client.subscribe((client) => {
      expect(client).toEqual(unauthenticatedClient);
    });
  
  }));

  it('should automatically change to an authenticated client when the user logs in', 
    inject([ ApiClientService, UserService ], (service: ApiClientService, user: UserService) => {

    var authStatus;
    var clientAuth;
    var authChanged = false;
    var clientChanged = false;

    user.$auth.subscribe((auth) => {
      authStatus = auth;

      if(clientChanged) {
        clientChanged = false;
        expect(clientAuth).toEqual(authStatus);
      } else {
        authChanged = true;
      }

    });

    service.$client.subscribe((client) => {
      clientAuth = client.auth;

      if(authChanged) {
        authChanged = false;
        expect(clientAuth).toEqual(authStatus);
      } else {
        clientChanged = true;
      }

    });

    spyOn(user, 'login').and.callFake((username, password) => {
      user.$auth.next(true);
    });

    spyOn(user, 'logout').and.callFake(() => {
      user.$auth.next(false);
    });
      
    user.login('username', 'password');
    user.logout();
    
  }));

});
