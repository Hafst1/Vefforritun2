import React from 'react';
import { shallow } from 'enzyme';
import LoginWindow from './LoginWindow';

describe('LoginWindow compenent tests', () => {
  let compenent;
  beforeEach(() => {
    compenent = shallow(<LoginWindow />);
  });

  it('should contain a button with class of .btn-primary', () => {
    expect(compenent.find('button').first().hasClass('btn-primary')).toBe(true);
  });
});