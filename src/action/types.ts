export interface ActionInputs {
  adminGroup: string;
  sonarToken: string;
  project: string;
  organization: string;
  projectName: string;
  mainBranch: string;
}

export enum ActionInputKeys {
  sonarToken = 'SONAR_TOKEN',
  project = 'SONAR_PROJECT_KEY',
  organization = 'SONAR_ORGANIZATION',
  projectName = 'SONAR_PROJECT_NAME',
  mainBranch = 'SONAR_DEFAULT_BRANCH',
  adminGroup = 'SONAR_PROJECT_ADMIN_GROUP',
}

export enum ActionOutputKeys {
  organization = 'SONAR_ORGANIZATION',
  projectKey = 'SONAR_PROJECT_KEY',
}
