import factory from '../generated/factories/user';
import permissions from '../helpers/permissions';

export default factory.extend({
  authorized_actions: () =>
    permissions.authorizedActionsFor('account') || [
      'no-op',
      'read',
      'update',
      'delete',
    ],
  id: (i) => `user-${i}`,
});
