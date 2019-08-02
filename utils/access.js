import {
  SUBSCRIPTION_STATE,
  ACCESS_TYPES,
  MSG_NEED_AUTHENTICATION,
  MSG_USER_AUTHENTICATED,
  MSG_SUSPENDED_OR_FREEZED_ACCOUNT,
  MSG_USER_ALLOWED
} from "constants";

class AccessLayer {
  allowed = false;
  description = "";
  type = "";

  constructor(type, allowed, description) {
    this.type = type;
    this.allowed = allowed;
    this.description = description;
  }
}

export default class Access {
  auth = false;
  videoPlayer = false;

  constructor(user) {
    this.auth = this.setAuthAccess(user);
    if (this.auth.allowed) {
      this.videoPlayer = this.setVideoPlayerAccess(user.access_type);
    }
  }

  setAuthAccess(user) {
    const description = user ? MSG_USER_AUTHENTICATED : MSG_NEED_AUTHENTICATION;
    const loggedIn = !!user;

    return new AccessLayer(ACCESS_TYPES.auth, loggedIn, description);
  }

  setVideoPlayerAccess(userAccessType) {
    const notFreezedNorSuspended =
      userAccessType !== "freezed" || userAccessType !== "suspended";
    const description = notFreezedNorSuspended
      ? MSG_USER_ALLOWED
      : MSG_SUSPENDED_OR_FREEZED_ACCOUNT;

    return new AccessLayer(
      ACCESS_TYPES.videoPlayer,
      notFreezedNorSuspended,
      description
    );
  }

  executeAccessPolitics() {
    if (this.auth.allowed) {
      console.log(this.auth.description);
      //Router.pushRoute('login');
    }

    if (this.video.allowed) {
      console.log(this.video.description);
      // show modal
    }

    if (this.quiz()) {
      // show modal
    }
  }
}
