class LeftTrackpadNavigationDoc {
  static get name() { return 'LeftTrackpadNavigationDoc'; }

  static getMeta() {
    return {
      kicker: "View Manipulation & Telemetry",
      title: "Left Trackpad: Spatial Camera Gestures & Inertia Physics",
      subtitle: "Multi-finger touch arbitration, perspective lens adjustment, and kinetic velocity simulations."
    };
  }

  static manifest() {
    return [
      {
        partLabel: "Part I",
        title: "Multi-Touch Gesture Matrix",
        blocks: [
          { id: "gestureIntro", type: "paragraph" },
          { id: "fingerMatrix", type: "sidebar", title: "Touch Chord Topology", kicker: "Gesture Engine" },
          { id: "doubleTapToggle", type: "paragraph" }
        ]
      },
      {
        partLabel: "Part II",
        title: "Perspective, Depth & Z-Axis Displacement",
        blocks: [
          { id: "threeFingerFov", type: "paragraph" },
          { id: "fourFingerZWheel", type: "paragraph" }
        ]
      },
      {
        partLabel: "Part III",
        title: "Kinetic Velocity & Inertial Physics Simulation",
        blocks: [
          { id: "inertiaPhysics", type: "paragraph" },
          { id: "frictionDampingFormula", type: "sidebar", title: "Inertia Decay Formula", kicker: "Physics Math" }
        ]
      }
    ];
  }

  static gestureIntro() {
    return [
      "The View Navigation Trackpad processes touch inputs via **`_onViewTouchStart`**, **`_onViewTouchMove`**, and **`_onViewTouchEnd`**. It supports up to four simultaneous touch contacts, routing distinct camera transformations based on finger counts."
    ];
  }

  static fingerMatrix() {
    return [
      "Touch gesture mapping:\n• **1 Finger Drag:** Smooth orbit camera rotation or planar panning.\n• **1 Finger Double-Tap:** Instantly toggles between **Rotate** and **Pan** modes.\n• **2 Finger Pinch:** Dynamic camera zoom in and out.\n• **3 Finger Vertical Drag:** Adjusts camera Field of View (FOV) and perspective angle.\n• **4 Finger Vertical Drag:** Rotates the workstation AccuDraw Z-axis displacement wheel.\n• **Flick Release:** Initiates kinetic inertia continuation."
    ];
  }

  static doubleTapToggle() {
    return [
      "Double-tap detection operates with a 220 ms threshold and 30 px spatial tolerance. When a double tap is confirmed on the view trackpad, `TouchController` queries the capability schema provided by the workstation during initial handshake. If the host defines multiple navigation modes, it cycles to the next mode and notifies the host via a `modeChange` event."
    ];
  }

  static threeFingerFov() {
    return [
      "Dragging three fingers vertically across the trackpad calculates average coordinate displacement $\\Delta y = (y_0 + y_1 + y_2)/3 - y_{last}$. This value is packaged and streamed as a `perspective` event. In accuCad, `BaseController.handleRemotePerspective(dy)` transforms the camera lens FOV, allowing draftspersons to transition smoothly between isometric orthographic-style flat views and dramatic wide-angle perspectives."
    ];
  }

  static fourFingerZWheel() {
    return [
      "A four-finger vertical swipe controls elevation along the normal of the active drawing plane. In accuCad, this streams directly into the `accudrawZ` channel, rolling the on-screen 3D wheel and translating the drawing plane along its normal vector $\\vec{Z}$."
    ];
  }

  static inertiaPhysics() {
    return [
      "Touch screens feel lifeless without kinetic momentum. When the user releases a single-finger drag or four-finger Z swipe, `TouchController` calculates the velocity vector $v_x, v_y$ using exponential moving averages. If the velocity exceeds $0.5\\text{ px/frame}$, an animation frame loop continues streaming decelerating drag events until friction brings the camera to a natural stop."
    ];
  }

  static frictionDampingFormula() {
    return [
      "Kinetic momentum is governed by exponential decay:\n$$\\vec{v}_{t+1} = \\vec{v}_t \\times 0.95$$\nEach frame loses 5% of its remaining velocity. When $\\|\\vec{v}\\| < 0.1\\text{ px/frame}$, the loop cancels, and a final `dragEnd` message commits the camera target."
    ];
  }
}

globalThis.LeftTrackpadNavigationDoc = LeftTrackpadNavigationDoc;
if (typeof module !== 'undefined' && module.exports) module.exports = LeftTrackpadNavigationDoc;