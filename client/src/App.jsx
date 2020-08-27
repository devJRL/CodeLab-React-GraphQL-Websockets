import React from "react";
import ReactDOM from "react-dom";

// https://designrevision.com/docs/shards-react/getting-started
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import Chat from "./Chat";

const App = () => <Chat />;

ReactDOM.render(<App />, document.getElementById("app"));
