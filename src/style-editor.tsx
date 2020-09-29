// import React from "react";
// import { render } from "react-dom";
// import App from "./App";

// render(<App />, document.getElementById("root"));

// if ((module as any).hot) {
//   (module as any).hot.accept("./App", () => {
//     const NextApp = require("./App").default;
//     render(<App />, document.getElementById("root"));
//   });
// }


import React from "react";
import ReactDOM from "react-dom";
import App from "./UI/App";
import * as serviceWorker from "./serviceWorker";
import editor from './tools/Manager';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("__style_editor__")
// );

export const styleEditor = {
  render: function(rootID: string) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById(rootID)
    );
  },
  postCSS: function(css: string) {
    editor.postCSS(css);
  },
  onCSSChanged: function(cb: Function) {
    editor.onReceiveCSSChange(function(res) {
      cb(res);
    })
  }
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// export styleEditor;