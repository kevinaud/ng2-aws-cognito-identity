

import { IamCredentials } from './iam-credentials';

export class ApigClientFactory {

  newClient(iamCredentials: IamCredentials) {

  }

}

let params = {
  id: 1
}

let body = {
  title: ''
}

api.endpoint('podcastIdEpisode').post(params, body)