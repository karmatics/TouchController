class TouchControllerArchitectureDoc {
  static get name() { return 'TouchControllerArchitectureDoc'; }

  static getMeta() {
    return {
      kicker: "Mobile CAD Interface Design",
      title: "TouchController Design Philosophy & System Architecture",
      subtitle: "Transforming standard smartphones into tactile, zero-latency 3D CAD multi-touch control surfaces."
    };
  }

  static manifest() {
    return [
      {
        partLabel: "Part I",
        title: "The Mobile Companion Philosophy",
        blocks: [
          { id: "philosophy", type: "paragraph" },
          { id: "touchVsMouseQuote", type: "quote" },
          { id: "tactileDuality", type: "paragraph" }
        ]
      },
      {
        partLabel: "Part II",
        title: "Responsive Orientation & Viewport Layouts",
        blocks: [
          { id: "layoutAdaptation", type: "paragraph" },
          { id: "orientationModes", type: "sidebar", title: "Dual Orientation Matrix", kicker: "Responsive Design" },
          { id: "touchPreventDefault", type: "paragraph" }
        ]
      }
    ];
  }

  static philosophy() {
    return [
      "Computer-aided design on desktop workstations traditionally relies on precision mice and complex modifier key combinations (`Ctrl`, `Alt`, `Shift`). **TouchController** reimagines the smartphone as a dedicated companion surface, decoupling view navigation and tool parameter manipulation from desktop cursor position without demanding expensive specialized 3D space mice."
    ];
  }

  static touchVsMouseQuote() {
    return [
      "A mouse is ideal for pinpoint geometric accuracy on a 4K monitor. A glass touchscreen is ideal for fluid multi-finger spatial navigation, continuous slider scrubbing, and tactile kinetic velocity."
    ];
  }

  static tactileDuality() {
    return [
      "The interface splits into two primary operational zones: the **View Navigation Trackpad** (Left hand in landscape, bottom in portrait) and the **Controls / Sliders Trackpad** (Right hand in landscape, top in portrait). This architectural separation guarantees that inspecting a model never collides with or interferes with active numerical parameter tweaking."
    ];
  }

  static layoutAdaptation() {
    return [
      "TouchController monitors mobile viewport ratios dynamically using CSS media queries (`@media (orientation: landscape)`) and resize observers. In portrait orientation, trackpads stack vertically to accommodate single-thumb ergonomics. In landscape orientation, the layout automatically transforms into a dual-thumb gamepad layout (`row-reverse`), mirroring standard console controller ergonomic zones."
    ];
  }

  static orientationModes() {
    return [
      "Layout configurations:\n• **Portrait Mode (`flex-direction: column`):** Controls Trackpad occupies top half of display; Navigation Trackpad occupies bottom half. Minimizes hand strain when holding a phone with one hand.\n• **Landscape Mode (`flex-direction: row-reverse`):** Navigation Trackpad anchored comfortably under the left thumb; Controls Trackpad anchored under the right thumb for simultaneous view orbit and slider modulation."
    ];
  }

  static touchPreventDefault() {
    return [
      "Mobile web browsers typically intercept touch gestures for page scrolling, pull-to-refresh, double-tap zoom, and rubber-band overscroll. TouchController applies strict CSS `touch-action: none` rules across all trackpad surfaces and invokes `e.preventDefault()` inside active touch handlers, ensuring every micro-motion is captured exclusively by the CAD telemetry pipeline."
    ];
  }
}

globalThis.TouchControllerArchitectureDoc = TouchControllerArchitectureDoc;
if (typeof module !== 'undefined' && module.exports) module.exports = TouchControllerArchitectureDoc;