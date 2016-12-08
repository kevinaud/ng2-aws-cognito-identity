import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// import { BlogPost } from "../blog/blog-post";
import { AwsService } from "./aws.service";
import { ApiClientService } from "./api-client.service";

@Injectable()
export class ApiGatewayService {

  client = null;
  authenticating;

  endpoints = null;

  constructor(private aws: AwsService, private apiClientService: ApiClientService) {

    let ref = this;

    this.apiClientService.$client.subscribe((client) => {
        ref.client = client;
        if(ref.endpoints === null){
            ref.loadEndpoints();
        }
    });
  }

  apiRequest(ref, endpoint, requestType) {
    return function(params, body, additionalParams) {
      let promise = ref.client[endpoint + requestType](params, body, additionalParams);

      return Observable.fromPromise(promise)
                .map((s) => {
                  let response: any = s;
                  return response.data;
                });
    };
  }

  private loadEndpoints() {
    console.log(Object.keys(this.client));
    return this.endpoints;
  }

}
