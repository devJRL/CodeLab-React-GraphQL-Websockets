import React from "react";
import ReactDOM from "react-dom";

import { Container } from 'shards-react';

// https://designrevision.com/docs/shards-react/getting-started
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

// Shards React : Container | https://designrevision.com/docs/shards-react/component/container
const App = () => (
  <Container>
    <br />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h1>Chat!</h1>
    <div>Chat window is here...</div>
    {/* https://loremipsum.io/ */}
    <p>Laoreet id donec ultrices tincidunt arcu. Sed nisi lacus sed viverra tellus in hac habitasse platea. Ullamcorper sit amet risus nullam eget. Porttitor eget dolor morbi non arcu risus quis varius quam. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Urna molestie at elementum eu facilisis sed odio morbi quis. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Velit laoreet id donec ultrices tincidunt arcu non sodales. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Morbi tincidunt ornare massa eget egestas. Accumsan sit amet nulla facilisi morbi tempus iaculis. Nulla posuere sollicitudin aliquam ultrices sagittis.</p>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
