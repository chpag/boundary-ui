/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  modelName: 'host',

  _hashForModel(model) {
    const json = ApplicationSerializer.prototype._hashForModel.apply(
      this,
      arguments
    );
    json.host_catalog_id = model.hostCatalogId;
    return json;
  },
});
