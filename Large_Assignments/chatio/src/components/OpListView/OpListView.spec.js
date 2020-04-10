import React from 'react';
import { shallow } from 'enzyme';
import OpListView from './OpListView';

describe('OpListView compenent tests', () => {
  let compenent;
  beforeEach(() => {
    compenent = shallow(<OpListView />);
  });

  it('should contain the heading Op List in bold', () => {
    const opList = <h6><strong>Op List</strong></h6>
    expect(compenent.contains(opList)).toEqual(true);
  });
});