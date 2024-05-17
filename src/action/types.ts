export interface ActionInputs {
  longLivedBranchRegex: string;
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
  longLivedBranchRegex = 'LONG_LIVED_BRANCH_REGEX'
}

export enum ActionOutputKeys {
  organization = 'SONAR_ORGANIZATION',
  projectKey = 'SONAR_PROJECT_KEY',
}
