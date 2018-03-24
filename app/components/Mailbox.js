// @flow
import React, { Component } from 'react';

import NavBar from './NavBar';

type Props = {};

export default class Mailbox extends Component<Props> {
  render() {
    return (
      <div>
        <NavBar />
        <br />
        This is mailbox page.
      </div>
    );
  }
}
