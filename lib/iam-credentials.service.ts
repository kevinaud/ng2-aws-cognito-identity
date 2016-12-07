import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IAMCredentials } from './iam-credentials';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class IAMCredentialsService {

  public $iamCredentials: BehaviorSubject<any>;

  constructor(private storage: LocalStorageService) {
    this.$iamCredentials = new BehaviorSubject({});
  }

}