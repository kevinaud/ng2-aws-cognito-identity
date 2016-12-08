import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { ApiGatewayService } from "./api-gateway.service";
import { AwsService } from "./aws.service";

@Injectable()
export class UserService {

  public $auth: BehaviorSubject<boolean>;

  constructor(private aws: AwsService) {
    this.$auth = new BehaviorSubject(false);
  }

  ngOnInit() { }

  login(username, password): Observable<any> {

    let promise = new Promise((resolve, reject) => {
      this.aws.cognitoLogin(username, password, (error, success) => {

        if (error) {
          this.$auth.next(false);
          reject(error);
        }
        else {
          this.$auth.next(true);
          resolve(success);
        }

      });
    });

    return Observable.fromPromise(promise);

  }

  logout() {
    this.$auth.next(false);
    localStorage.removeItem("token");
  }

}
