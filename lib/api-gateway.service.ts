import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import { BlogPost } from '../blog/blog-post';
import { AwsService } from './aws.service';
import { ApiClientService } from './api-client.service';
import { Regex } from './regex.service';

@Injectable()
export class ApiGatewayService {

  client = "";
  authenticating;

  public endpoints = {};

  constructor(
      private aws: AwsService, 
      private apiClientService: ApiClientService, 
      private regex: Regex) {
    
    var ref = this;

  }

  apiRequest(ref, endpoint, requestType) {
    return function(params, body, additionalParams) {
      let promise = ref.client[endpoint + requestType](params, body, additionalParams);

      return Observable.fromPromise(promise)
                .map((s) => { 
                  var response: any = s;
                  return response.data;
                });
    }
  }

  isGetEndpoint(method) {
    return method.substr(method.length - 3) === 'Get';
  }

  isPostEndpoint(method) {
    return method.substr(method.length - 4) === 'Post';
  }

  isPutEndpoint(method) {
    return method.substr(method.length - 3) === 'Put';
  }

  isOptionsEndpoint(method) {
    return method.substr(method.length - 7) === 'Options';
  }

  isDeleteEndpoint(method) {
    return method.substr(method.length - 6) === 'Delete';
  }

  post(endpoint) {

  }

  get(endpoint) {

  }

  delete(endpoint) {

  }

}
