import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ApiGatewayService } from "./api-gateway.service";

@Injectable()
export class UserService {

  public $auth: BehaviorSubject<boolean>;

  constructor() {
    this.$auth = new BehaviorSubject(false);
  }

  login(username, password) {

  }

  logout() {

  }

}