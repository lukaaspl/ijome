import App from "components/App";
import React from "react";
import { render } from "react-dom";

import "styles/index.scss";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/dist/tippy.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
