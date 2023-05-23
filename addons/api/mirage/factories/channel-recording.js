/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import factory from '../generated/factories/channel-recording';
import generateId from '../helpers/id';
import { faker } from '@faker-js/faker';

export default factory.extend({
  id: () => generateId('chr_'),
  start_time(i) {
    return i % 3 === 2 ? null : faker.date.recent(3, this.end_time);
  },
  end_time: (i) => (i % 3 === 2 ? null : faker.date.recent()),
  duration: (i) => (i % 3 === 2 ? null : `${faker.datatype.number()}s`),
});
