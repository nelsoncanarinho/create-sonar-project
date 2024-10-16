import * as core from '@actions/core';
import ApiClient from '../api/api-client';
import { ActionOutputKeys } from './types';
import { buildCreateProjectParams, getInputs } from './utils';

export async function run() {
  try {
    const inputs = getInputs();

    const api = new ApiClient(inputs.sonarToken);
    const createProjectParams = buildCreateProjectParams(inputs);

    const getProjectResponse = await api.getProjectByProjectKey({
      organization: createProjectParams.organization,
      projects: [createProjectParams.project],
    });

    const projectExists = getProjectResponse.components.find(
      item => item.key === createProjectParams.project
    );

    if (projectExists) {
      core.setOutput(ActionOutputKeys.organization, projectExists.organization);
      core.setOutput(ActionOutputKeys.projectKey, projectExists.key);

      core.notice(
        `Project ${projectExists.key} already exists. No action performed.`
      );
      return core.ExitCode.Success;
    }

    const { project } = await api.createProject(createProjectParams);

    const shouldRenameMainBranch = inputs.mainBranch !== 'master';

    if (shouldRenameMainBranch) {
      await api.renameMasterBranch({
        name: inputs.mainBranch,
        project: project.key,
      });
    }

    if (inputs.adminGroup) {
      await api.setAdminPermissions({
        project: project.key,
        organization: createProjectParams.organization,
        groupName: inputs.adminGroup,
      });

      core.notice(`Admin permissions granted to group: ${inputs.adminGroup}`);
    }

    core.setOutput(
      ActionOutputKeys.organization,
      createProjectParams.organization
    );
    core.setOutput(ActionOutputKeys.projectKey, project.key);

    return core.ExitCode.Success;
  } catch (error) {
    core.debug(JSON.stringify(error));

    if (error instanceof Error) {
      core.error(error.message);
    } else {
      core.error(`Failed to complete action.`);
    }

    return core.ExitCode.Failure;
  }
}
