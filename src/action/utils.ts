import * as core from '@actions/core';
import * as github from '@actions/github';

import { CreateProjectParams, PostLongLivedBranchesParams } from '../api/types';
import { ActionInputKeys, ActionInputs } from './types';

export function getInputs(): ActionInputs {
  const sonarToken = core.getInput(ActionInputKeys.sonarToken, {
    required: true,
  });

  const { repo } = github.context;
  const organization: string = core.getInput(ActionInputKeys.organization) ?? repo.owner;
  const projectName: string = core.getInput(ActionInputKeys.projectName) ?? repo.repo;
  const project: string = core.getInput(ActionInputKeys.project) ?? `${organization}_${projectName}`;
  const mainBranch: string = core.getInput(ActionInputKeys.mainBranch) ?? 'main';
  const longLivedBranchRegex: string = core.getInput(ActionInputKeys.longLivedBranchRegex) ?? '';

  return { sonarToken, project, organization, projectName, mainBranch, longLivedBranchRegex };
}

export function buildCreateProjectParams(
  inputs: ActionInputs
): CreateProjectParams {
  const { repo } = github.context;

  const organization = inputs.organization || repo.owner;
  const name = inputs.projectName || repo.repo;
  const project = inputs.project || `${organization}_${name}`;
  
  return { name, organization, project };
}

export function buildLovedLivedBranchesParams(
  inputs: ActionInputs,
): PostLongLivedBranchesParams {
  const component: string = inputs.project ?? `${inputs.organization}_${inputs.projectName}`;
  const key = 'sonar.branch.longLivedBranches.regex';
  const value: string = inputs.longLivedBranchRegex;

  return { key, value, component };
}
