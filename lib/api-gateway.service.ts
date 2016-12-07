import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// import { BlogPost } from "../blog/blog-post";
import { AwsService } from "./aws.service";
import { ApiClientService } from "./api-client.service";

@Injectable()
export class ApiGatewayService {

  client = "";
  authenticating;

  public endpoints = {};

  constructor(private aws: AwsService, private apiClientService: ApiClientService) {

    let ref = this;
    /* this.apiClientService.$factory.subscribe((client) => {
      ref.client = client;
      
      Object.keys(client).forEach((method) => {
        
        if (this.isPostEndpoint(method)) {
          let endpoint = method.substr(0, method.length - 4)

          let postMethod = {
            post: ref.apiRequest(ref, endpoint, "Post")
          }
          this.endpoints[endpoint] = Object.assign({}, this.endpoints[endpoint], postMethod);

        } else if (this.isPutEndpoint(method)) {
          let endpoint = method.substr(0, method.length - 3)
          
          let putMethod = {
            put: ref.apiRequest(ref, endpoint, "Put")
          }
          this.endpoints[endpoint] = Object.assign({}, this.endpoints[endpoint], putMethod);

        } else if (this.isGetEndpoint(method)) {
          let endpoint = method.substr(0, method.length - 3)
          
          let getMethod = {
            get: ref.apiRequest(ref, endpoint, "Get")
          }
          this.endpoints[endpoint] = Object.assign({}, this.endpoints[endpoint], getMethod);

        } else if (this.isDeleteEndpoint(method)) {
          let endpoint = method.substr(0, method.length - 6)
          
          let deleteMethod = {
            delete: ref.apiRequest(ref, endpoint, "Delete")
          }
          this.endpoints[endpoint] = Object.assign({}, this.endpoints[endpoint], deleteMethod);

        } else if (this.isOptionsEndpoint(method)) {
          let endpoint = method.substr(0, method.length - 7)
          
          let optionsMethod = {
            options: ref.apiRequest(ref, endpoint, "Options")
          }
          this.endpoints[endpoint] = Object.assign({}, this.endpoints[endpoint], optionsMethod);

        }

      });

      console.log("endpoints", this.endpoints);

    });   */

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

  isGetEndpoint(method) {
    return method.substr(method.length - 3) === "Get";
  }

  isPostEndpoint(method) {
    return method.substr(method.length - 4) === "Post";
  }

  isPutEndpoint(method) {
    return method.substr(method.length - 3) === "Put";
  }

  isOptionsEndpoint(method) {
    return method.substr(method.length - 7) === "Options";
  }

  isDeleteEndpoint(method) {
    return method.substr(method.length - 6) === "Delete";
  }

  /*getAllBlogPosts() {

    return this.client.blogPostGet();

  }

  addBlogPost(post) {

    let params = {};
    let body = post;
    let additionalParams = {};

    return this.client.blogPostPost(params, body, additionalParams);

  }

  getBlogPost(id: string) {
    
    var params = {
        id: id
    };
    let body = {};
    let additionalParams = {};

    return this.client.blogPostIdGet(params, body, additionalParams);
  
  }

  deleteBlogPost(id: string) {
  
    var params = {
        id: id
    };
    let body = {};
    let additionalParams = {};

    return this.client.blogPostIdDelete(params, body, additionalParams);
  
  }

  updateBlogPost(id: string) {
  
    var params = {
        id: id
    };
    let body = {};
    let additionalParams = {};

    return this.client.blogPostIdPost(params, body, additionalParams);
  
  }*/

}
