import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  API_CONFIG,
  CreateProjectParams,
  CreateProjectResponse,
  GetProjectsByProjectKeyParams,
  GetProjectsByProjectKeyResponse,
  PostBranchRenameParams,
  PostLongLivedBranchesParams,
} from './types';

export default class ApiClient {
  private httpClient: AxiosInstance;

  constructor(apiToken: string) {
    this.httpClient = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      auth: { username: apiToken, password: '' },
    });
  }

  async createProject(params: CreateProjectParams): Promise<CreateProjectResponse> {
    return Promise.resolve(this.httpClient
      .post<CreateProjectResponse>(`${API_CONFIG.PATHS.PROJECTS}/create`, '', {
        params,
      })
      .then(res => res.data)
    );
  }

  async getProjectByProjectKey(params: GetProjectsByProjectKeyParams) {
    return Promise.resolve(this.httpClient
      .get<GetProjectsByProjectKeyResponse>(
        `${API_CONFIG.PATHS.PROJECTS}/search`,
        {
          params,
        }
      )
      .then(res => res.data)
    );
  }

  async renameMasterBranch(params: PostBranchRenameParams): Promise<AxiosResponse> {
    return Promise.resolve(this.httpClient.post(`${API_CONFIG.PATHS.BRANCHES}/rename`, '', {
      params,
    }));
  }

  async setLongLivedBranches(params: PostLongLivedBranchesParams): Promise<AxiosResponse> {
    return Promise.resolve(await this.httpClient.post(`${API_CONFIG.PATHS.SETTINGS}/set`, '', {
      params,
    }));

  }
}


