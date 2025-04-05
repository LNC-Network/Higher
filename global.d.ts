declare global {
  interface Window {
    ethereum?: any;
  }
}

import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
export {};
