class RightTrackpadControlsDoc {
  static get name() { return 'RightTrackpadControlsDoc'; }

  static getMeta() {
    return {
      kicker: "Slider & Parameter Modulation",
      title: "Right Trackpad: Directional Locking & Slider Modulation",
      subtitle: "Orthogonal gesture disambiguation, continuous vertical scrubbing, and direct tap triggers."
    };
  }

  static manifest() {
    return [
      {
        partLabel: "Part I",
        title: "Directional Gesture Locking",
        blocks: [
          { id: "gestureDisambiguation", type: "paragraph" },
          { id: "lockStateRules", type: "sidebar", title: "Gesture Disambiguation Protocol", kicker: "State Machine" },
          { id: "doubleTapModeToggle", type: "paragraph" }
        ]
      },
      {
        partLabel: "Part II",
        title: "Vertical Selection & Horizontal Adjustment",
        blocks: [
          { id: "verticalSelection", type: "paragraph" },
          { id: "horizontalAdjustment", type: "paragraph" },
          { id: "tapTriggerExecution", type: "paragraph" }
        ]
      }
    ];
  }

  static gestureDisambiguation() {
    return [
      "Controlling dozens of CAD sliders with a blank trackpad requires an intelligent directional discriminator. When a finger touches the Controls Trackpad, the engine initializes in an unlocked evaluation state. As the finger moves past a 10-pixel threshold, the angle of displacement locks the interaction into either **Vertical Scrubbing** (selecting which slider or control is active) or **Horizontal Modulation** (adjusting the value of the active slider)."
    ];
  }

  static lockStateRules() {
    return [
      "State transitions in `_onCtrlTouchMove`:\n• $|\\Delta y| > |\\Delta x|$: Locks to **Vertical Mode**. Emits `sliderDragStart` and continuous `sliderDragMove` events to scroll between host sliders.\n• $|\\Delta x| \\ge |\\Delta y|$: Locks to **Horizontal Mode**. Emits `sliderAdjustStart` followed by proportional `sliderAdjust` ratio packets.\n• Touch release with $\\Delta t < 250\\text{ms}$ and $\\|\\Delta\\| < 10\\text{px}$: Emits a clean `sliderTap` event."
    ];
  }

  static doubleTapModeToggle() {
    return [
      "Double-tapping the right trackpad switches the active control bank on the desktop workstation—such as toggling between **Compass Controls** (size, transparency, plane rotations) and **Tool Settings** (line width, rounding radius, copy toggles). The mobile client highlights the active mode and updates the trackpad footer in real time."
    ];
  }

  static verticalSelection() {
    return [
      "In vertical mode, `TouchController` transmits the absolute delta $y - y_{start}$ along with the mobile trackpad's pixel height. On the CAD workstation, `ViewControls.handleSliderDragMove()` calculates which slider element is closest to the projected finger position, updating the glowing neon guide line and scrolling the desktop sidebar to keep the active parameter in clear view."
    ];
  }

  static horizontalAdjustment() {
    return [
      "In horizontal mode, finger displacement is normalized against the trackpad width: $\\text{ratio} = ((x - x_{start}) / \\text{width}) \\times 1.333$. The CAD host applies this ratio to the slider's mathematical range $[min, max]$. For color swatch pickers, this smoothly rotates the 360° hue wheel; for numerical fields, it modifies dimensions with precision tactile feedback."
    ];
  }

  static tapTriggerExecution() {
    return [
      "A quick tap on the right trackpad dispatches a `sliderTap` packet. If the selected item on the desktop is a checkbox (such as 'Make Copy' or 'Maintain Aspect Ratio'), tapping toggles the setting immediately. If the slider supports direct numerical entry, tapping invokes the desktop numerical popup without requiring the user to touch the computer keyboard."
    ];
  }
}

globalThis.RightTrackpadControlsDoc = RightTrackpadControlsDoc;
if (typeof module !== 'undefined' && module.exports) module.exports = RightTrackpadControlsDoc;