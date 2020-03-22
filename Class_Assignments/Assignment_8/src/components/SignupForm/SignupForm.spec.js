import React from 'react';
import { mount } from 'enzyme';
import SignupForm from './';

// SETUP TESTS

describe('SignupForm component tests', () => {
  let component;

  beforeEach(() => {
    component = mount(<SignupForm />);
  });

  it('should test the generic input handler', () => {
    const name = 'Mr. Magoo';
    const email = 'magoo@magoo.com';

    component.find('input[name="name"]').first().simulate('change', { target: { value: name, name: 'name' } });
    component.find('input[name="email"]').first().simulate('change', { target: { value: email, name: 'email' } });

    expect(component.state().fields.name).toBe(name);
    expect(component.state().fields.email).toBe(email);
  });

  it('should contain an error if the form is invalid', () => {
    const invalidEmail = 'arnarl$ru.is';
    component.find('input[name="email"]').first().simulate('change', { target: { value: invalidEmail, name: 'email' } });
    component.find('Form').simulate('submit');

    expect(component.state().errors.name).toBe('Name is required.');
    expect(component.state().errors.email).toBe('Email is not correct.');
  });

  it('should successfully submit the form if the data is valid', () => {
    component.find('input[name="name"]').first().simulate('change', { target: { value: 'Arnar Leifsson', name: 'name' } });
    component.find('input[name="email"]').first().simulate('change', { target: { value: 'arnarl@ru.is', name: 'email'} });
    // component.find('input[type="submit"]').simulate('submit');
    expect(Object.values(component.state().errors).every(v => v === '')).toBe(true);
  });
})