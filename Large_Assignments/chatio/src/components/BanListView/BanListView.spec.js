import React from 'react';
import { shallow } from 'enzyme';
import BanListView from './BanListView';

describe('BanListView compenent tests', () => {
  let compenent;
  beforeEach(() => {
    compenent = shallow(<BanListView />);
  });

  it('should contain the heading Users in exile', () => {
    const banList = <h6><strong>Users in exile</strong></h6>
    expect(compenent.contains(banList)).toEqual(true);
  });
});