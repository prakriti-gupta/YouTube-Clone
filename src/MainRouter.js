import React, { Component } from 'react';
import { render } from 'react-dom';

import Page1 from './Page1';
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Page1: {
    screen: Page1
  },
  
  drawerWidth: 300
});

