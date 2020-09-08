import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from 'ember';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

/**
 * Entry route for the application.
 */
export default class ApplicationRoute extends Route.extend(
  ApplicationRouteMixin
) {
  // =services

  @service session;

  // =attributes

  routeIfUnauthenticated = 'index';

  // =methods

  /**
   * After becoming authenticated, does nothing.  This overrides the default
   * behavior of the ApplicationRouteMixin, which is to redirect after auth.
   * We'll handle this redirect manually in sub routes.
   * @override
   */
  sessionAuthenticated() {
    // no op
  }

  /**
   * When the session ends, redirect to authenticate and reload the page to
   * purge any in-memory state.
   */
  async sessionInvalidated() {
    // Catch error in this transition, since it will be aborted by the
    // scope auth route when it redirects to the first auth method.
    await this.transitionTo(this.routeIfUnauthenticated).catch(() => {});
    // The Ember way of accessing globals...
    const document = getOwner(this).lookup('service:-document').documentElement;
    // defaultView === window, but without using globals directly
    const { location } = document.parentNode.defaultView;
    // Wait a beat, then reload the page...
    // This is mostly to give the deauth request a chance to fire.
    /* istanbul ignore if */
    if (!Ember.testing) later(location, location.reload, 150);
  }

  // =actions

  /**
   * Delegates invalidation to the session service.
   */
  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  error(e) {
    const isUnauthenticated = e?.errors[0]?.isUnauthenticated;
    if (isUnauthenticated) {
      this.session.invalidate();
      return false;
    } else {
      return true;
    }
  }
}
