import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react';

const NavBar = () => (
  <List selection verticalAlign="middle">
    <List.Item>
      <Icon name="home" />
      <List.Content>
        <List.Header><Link to="/">Home</Link></List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Icon name="address card outline" />
      <List.Content>
        <List.Header><Link to="/counter">Counter</Link></List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Icon name="mail outline" />
      <List.Content>
        <List.Header><Link to="/mailbox">Mailbox</Link></List.Header>
      </List.Content>
    </List.Item>
  </List>
);

export default NavBar;
