import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ScopesScopeSessionRecordingsSessionRecordingRoute extends Route {
  // =services
  @service store;
  @service session;
  @service router;

  // =methods

  /**
   * If arriving here unauthenticated, redirect to index for further processing.
   */
  beforeModel() {
    if (!this.session.isAuthenticated) this.router.transitionTo('index');
  }

  /**
   * Load session recording.
   * @return {sessionRecording: SessionRecordingModel}
   */
  async model({ session_recording_id }) {
    const sessionRecording = await this.store.findRecord(
      'session-recording',
      session_recording_id
    );

    return sessionRecording;
  }
}
