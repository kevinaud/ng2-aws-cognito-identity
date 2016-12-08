import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// import { BlogPost } from "../blog/blog-post";
import { AwsService } from "./aws.service";
import { ApiClientService } from "./api-client.service";
import { Match } from "./match.service";

@Injectable()
export class ApiGatewayService {

  client = null;
  authenticating;

  endpoints = null;

  constructor(private aws: AwsService, private apiClientService: ApiClientService, 
              private match: Match) {

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
    let ref = this;
    ref.endpoints = {};

    Object.keys(this.client).forEach((func) => {
        let method = ref.match.requestMethod(func);
        let endpoint = ref.match.removeRequestMethod(func);

        if(method){
            if(!ref.endpoints.hasOwnProperty(endpoint)){
                ref.endpoints[endpoint] = {};
            }

            ref.endpoints[endpoint][method] = function(params, body, addParams){
                //ref.client[
            }
        }
        else{
            console.error("ERROR: " + func + " is not a valid method");
        }
    });

    return ref.endpoints;
  }

}
