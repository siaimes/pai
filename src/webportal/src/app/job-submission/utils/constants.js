// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

export const STORAGE_PREFIX = '/pai_data/';
export const SECRET_PATTERN = /^<% \$secrets.([a-zA-Z_][a-zA-Z0-9_]*) %>/;

export const ERROR_MARGIN = 22.15;
export const TENSORBOARD_LOG_PATH = '/mnt/tensorboard';
// Wrap comments with `` just a workaround, we may need to change rest-server or
// runtime to support comments in commands filed
export const CUSTOM_STORAGE_START = '`#CUSTOM_STORAGE_START`';
export const CUSTOM_STORAGE_END = '`#CUSTOM_STORAGE_END`';
export const TEAMWISE_DATA_CMD_START = '`#TEAMWISE_STORAGE_START`';
export const TEAMWISE_DATA_CMD_END = '`#TEAMWISE_STORAGE_END`';
export const AUTO_GENERATE_NOTIFY =
  '`#Auto generated code, please do not modify`';
export const PAI_ENV_VAR = [
  {
    key: 'PAI_JOB_NAME',
    desc: 'jobName in config file',
  },
  {
    key: 'PAI_USER_NAME',
    desc: 'User who submit the job',
  },
  {
    key: 'PAI_DEFAULT_FS_URI',
    desc: 'Default file system uri in PAI',
  },
  {
    key: 'PAI_TASK_ROLE_COUNT',
    desc: `Total task roles' number in config file`,
  },
  {
    key: 'PAI_TASK_ROLE_LIST',
    desc: 'Comma separated all task role names in config file',
  },
  {
    key: 'PAI_TASK_ROLE_TASK_COUNT_$taskRole',
    desc: 'Task count of the task role',
  },
  {
    key: 'PAI_HOST_IP_$taskRole_$taskIndex',
    desc: 'The host IP for taskIndex task in taskRole',
  },
  {
    key: 'PAI_PORT_LIST_$taskRole_$taskIndex_$portType',
    desc: 'The $portType port list for taskIndex task in taskRole',
  },
  {
    key: 'PAI_RESOURCE_$taskRole',
    desc:
      'Resource requirement for the task role in "gpuNumber,cpuNumber,memMB,shmMB" format',
  },
  {
    key: 'PAI_MIN_FAILED_TASK_COUNT_$taskRole',
    desc: 'taskRole.minFailedTaskCount of the task role',
  },
  {
    key: 'PAI_MIN_SUCCEEDED_TASK_COUNT_$taskRole',
    desc: 'taskRole.minSucceededTaskCount of the task role',
  },
  {
    key: 'PAI_CURRENT_TASK_ROLE_NAME',
    desc: 'taskRole.name of current task role',
  },
  {
    key: 'PAI_CURRENT_TASK_ROLE_CURRENT_TASK_INDEX',
    desc: 'Index of current task in current task role, starting from 0',
  },
];
export const PROTOCOL_TOOLTIPS = {
  taskRoleContainerSize:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/quick-start.html',
  hivedSkuType:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/quick-start.html',
  taskRole:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-run-distributed-job.html#taskrole-and-instance',
  parameters:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-use-advanced-job-settings.html#parameters-and-secrets',
  secrets: `https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-use-advanced-job-settings.html#parameters-and-secrets`,
  data:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-manage-data.html',
  tools:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-debug-jobs.html#how-to-debug-jobs',
  dockerImage:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/docker-images-and-job-examples.html',
  teamStorage:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-manage-data.html#use-storage-in-jobs',
  tensorboard:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-debug-jobs.html#how-to-use-tensorboard-plugin',
  ssh:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-debug-jobs.html#how-to-use-ssh',
  policy:
    'https://openpai.readthedocs.io/en/latest/manual/cluster-user/how-to-use-advanced-job-settings.html#job-exit-spec-retry-policy-and-completion-policy',
};

export const COMMAND_PLACEHOLDER = `'You could define your own Parameters, Secrets or Data mount point on the right sidebar.

All lines will be concatenated by "&&". So do not use characters like "#", "\\" in your command'`;

export const DOCKER_OPTIONS = [
  {
    key: 'pytorch-2.0.1-cuda11.7-cudnn8-devel',
    text: 'pytorch-2.0.1-cuda11.7-cudnn8-devel',
    image: 'siaimes/pytorch:2.0.1-cuda11.7-cudnn8-devel',
  },
  {
    key: 'pytorch-1.13.1-cuda11.6-cudnn8-devel',
    text: 'pytorch-1.13.1-cuda11.6-cudnn8-devel',
    image: 'siaimes/pytorch:1.13.1-cuda11.6-cudnn8-devel',
  },
  {
    key: 'pytorch-1.12.1-cuda11.3-cudnn8-devel',
    text: 'pytorch-1.12.1-cuda11.3-cudnn8-devel',
    image: 'siaimes/pytorch:1.12.1-cuda11.3-cudnn8-devel',
  },
  {
    key: 'pytorch-1.11.0-cuda11.3-cudnn8-devel',
    text: 'pytorch-1.11.0-cuda11.3-cudnn8-devel',
    image: 'siaimes/pytorch:1.11.0-cuda11.3-cudnn8-devel',
  },
  {
    key: 'pytorch-1.10.0-cuda11.3-cudnn8-devel',
    text: 'pytorch-1.10.0-cuda11.3-cudnn8-devel',
    image: 'siaimes/pytorch:1.10.0-cuda11.3-cudnn8-devel',
  },
  {
    key: 'pytorch-1.9.1-cuda11.1-cudnn8-devel',
    text: 'pytorch-1.9.1-cuda11.1-cudnn8-devel',
    image: 'siaimes/pytorch:1.9.1-cuda11.1-cudnn8-devel',
  },
  {
    key: 'pytorch-1.8.1-cuda11.1-cudnn8-devel',
    text: 'pytorch-1.8.1-cuda11.1-cudnn8-devel',
    image: 'siaimes/pytorch:1.8.1-cuda11.1-cudnn8-devel',
  },
  {
    key: 'pytorch-1.7.1-cuda11.0-cudnn8-devel',
    text: 'pytorch-1.7.1-cuda11.0-cudnn8-devel',
    image: 'siaimes/pytorch:1.7.1-cuda11.0-cudnn8-devel',
  },
  {
    key: 'pytorch-1.6.0-cuda10.1-cudnn7-devel',
    text: 'pytorch-1.6.0-cuda10.1-cudnn7-devel',
    image: 'siaimes/pytorch:1.6.0-cuda10.1-cudnn7-devel',
  },
  {
    key: 'pytorch-1.5.1-cuda10.1-cudnn7-devel',
    text: 'pytorch-1.5.1-cuda10.1-cudnn7-devel',
    image: 'siaimes/pytorch:1.5.1-cuda10.1-cudnn7-devel',
  },
  {
    key: 'pytorch-1.4-cuda10.1-cudnn7-devel',
    text: 'pytorch-1.4-cuda10.1-cudnn7-devel',
    image: 'siaimes/pytorch:1.4-cuda10.1-cudnn7-devel',
  },
  {
    key: 'pytorch-1.3-cuda10.1-cudnn7-devel',
    text: 'pytorch-1.3-cuda10.1-cudnn7-devel',
    image: 'siaimes/pytorch:1.3-cuda10.1-cudnn7-devel',
  },
  {
    key: 'pytorch-1.2-cuda10.0-cudnn7-devel',
    text: 'pytorch-1.2-cuda10.0-cudnn7-devel',
    image: 'siaimes/pytorch:1.2-cuda10.0-cudnn7-devel',
  },
];
export const DEFAULT_DOCKER_URI =
  'openpai/standard:python_3.6-pytorch_1.2.0-gpu';
// For PAI runtime only
export const PAI_PLUGIN = 'com.microsoft.pai.runtimeplugin';

export const STORAGE_PLUGIN = 'teamwise_storage';

export const SSH_KEY_BITS = 1024;

export const USERSSH_TYPE_OPTIONS = [
  {
    key: 'custom',
    text: 'Custom',
  },
  // {
  //   key: 'system',
  //   text: 'System',
  // },
];
