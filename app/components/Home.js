// @flow
import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styles from './Home.scss';
import NavBar from './NavBar';

const HeaderIcon = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="mail" circular />
      <Header.Content>
        Welcome!
      </Header.Content>
      <Header.Subheader>
        Manage your account settings and set e-mail preferences.
      </Header.Subheader>
    </Header>
  </div>
);

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container}>
          <HeaderIcon />
          <NavBar />
        </div>
      </div>
    );
  }
}
