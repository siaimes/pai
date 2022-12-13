# Copyright (c) Microsoft Corporation
# All rights reserved.
#
# MIT License
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
# to permit persons to whom the Software is furnished to do so, subject to the following conditions:
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import os
import logging
import logging.config

from .external_version_control.external_config import getting_external_config
from .external_version_control.storage_factory import get_external_storage
from .upload import UploadConfiguration
from ..clusterObjectModel.service_config_update import ServiceConfigUpdate


class Synchronization:

    def __init__(self, **kwargs):

        self.logger = logging.getLogger(__name__)

        # Configuration for local conf
        self.local_conf_path = None
        # Configuration for configmap [Access to k8s through exist kube_config.]
        self.kube_config_path = None
        # Cluster Configuration of pai.
        self.pai_cluster_configuration_path = None

        # External storage configuration data
        self.external_storage_configuration = None

        # The config list which should be pushed into cluster.
        self.config_push_list = None

        if "local_conf_path" in kwargs and kwargs["local_conf_path"] != None:
            self.local_conf_path = kwargs["local_conf_path"]

        if "kube_config_path" in kwargs and kwargs["kube_config_path"] != None:
            self.kube_config_path = kwargs["kube_config_path"]

        if "pai_cluster_configuration_path" in kwargs and kwargs["pai_cluster_configuration_path"] != None:
            self.pai_cluster_configuration_path = kwargs["pai_cluster_configuration_path"]

        if "config_push_list" in kwargs and kwargs["config_push_list"] != None:
            self.config_push_list = kwargs["config_push_list"]
        else:
            self.config_push_list = [
                "config.yaml",
                "k8s-role-definition.yaml",
                "kubernetes-configuration.yaml",
                "layout.yaml",
                "services-configuration.yaml"
            ]
        
        # Check whether the config files to be uploaded exists
        self._check_if_file_exists()

    def _check_if_file_exists(self):
        file_list = set()
        for folder_path_type in ["local_conf_path", "pai_cluster_configuration_path"]:
            if hasattr(self, folder_path_type):
                folder_path = getattr(self, folder_path_type)
                if folder_path != None and os.path.isdir(folder_path):
                    file_list |= set(os.listdir(folder_path))
        missing_files = set(self.config_push_list) - set(file_list)
        for missing_file in missing_files:
            self.logger.error("Cannot find {} in your config folder.".format(missing_file))
            if missing_file == "config.yaml":
                self.logger.error("Before v1.7.0, this file is stored in ~/pai-deploy/cluster-cfg/config.yaml on the dev box machine.")
                self.logger.error("If you have upgraded to v1.7.0, please copy this file to the config folder.")
                self.logger.warning("If `config.yaml` is lost, you need to create a new one. Here is an example for reference:")
                self.logger.warning("https://openpai.readthedocs.io/en/latest/manual/cluster-admin/installation-guide.html#configyaml-example")
        if len(missing_files) > 0:
            raise Exception("Some configuration files not found.")

    def get_external_storage_conf(self):
        external_config = getting_external_config(
            external_storage_conf_path = self.local_conf_path,
            local_cluster_configuration = self.pai_cluster_configuration_path,
            kube_config_path = self.kube_config_path
        )
        return external_config.get_latest_external_configuration()

    def sync_data_from_source(self):

        self.external_storage_configuration = self.get_external_storage_conf()
        with get_external_storage(self.external_storage_configuration) as configuration_path:
            self.logger.info("The temporary cluster configuration path is : {0}".format(configuration_path))

            config_format_check = ServiceConfigUpdate(configuration_path)
            config_format_check.run()

            conf_uploader = UploadConfiguration(configuration_path, self.kube_config_path, self.config_push_list)
            conf_uploader.run()
            self.logger.info("Cluster Configuration synchronization from external storage is successful.")
