// import Posenet from '@tensorflow-models/posenet'

export default class PoseNetPointer {
  constructor() {
    // Whether we're running inference or not
    this._isRunning = false;
  }

  /**
   * Starts running inference with PoseNet
   * @param {Function} cb A callback to call once PoseNet is ready
   */
  start(cb) {
    cb();
  }

  /**
   * Mobile helpers
   * - Checks if we're running on either Android or IOS
   */
  isMobile() {
    return this.isAndroid() || this.isIOS();
  }
  isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }
  isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  /**
   * Checks if WebGL is supported
   */
  isWebGLSupported() {
    try {
      let canvas = document.createElement("canvas");
      let isSupported = true;
      if (
        !canvas.getContext("webgl") ||
        !canvas.getContext("experimental-webgl")
      )
        isSupported = false;
      canvas.remove();

      return !!isSupported;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
