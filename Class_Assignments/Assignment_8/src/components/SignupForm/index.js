import React from 'react';
import { Form, FormInput, FormSelect, FormGroup, Button } from "shards-react";
import validator from 'validator';

const options = [
  '18-25',
  '26-35',
  '36-45',
  '46-55',
  '56+'
];

class SignupForm extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      ageGroup: '',
    },
    errors: {}
  }

  validateForm() {
    const { name, email, ageGroup } = this.state.fields;
    const errors = {};
    if (name === '') {
      errors.name = 'Name is required.';
    }
    if (email === '' || !validator.isEmail(email)) {
      errors.email = 'Email is not correct.';
    }
    if (ageGroup === '') {
      errors.ageGroup = 'Age group must be selected.';
    }

    this.setState({ errors });

    if (Object.keys(errors).length > 0) { return false; }
    return true;
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.validateForm()) { return; }
    alert('Form was submitted correctly');
  }

  genericInputHandler(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [ e.target.name ]: e.target.value,
      },
    });
  }

  render() {
    const { name, email, ageGroup } = this.state.fields;
    const { errors } = this.state;
    return (
      <>
        <h2>Signup here!</h2>
        <Form onSubmit={ e => this.submitForm(e) }>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <FormInput
              autoFocus
              value={ name }
              onChange={ e => this.genericInputHandler(e) }
              name="name"
              id="name"
              invalid={ errors.hasOwnProperty('name') }
              placeholder="Enter name" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput
              value={ email }
              onChange={ e => this.genericInputHandler(e) }
              name="email"
              id="email"
              invalid={ errors.hasOwnProperty('email') }
              placeholder="Enter email" />
          </FormGroup>
          <FormGroup>
            <label htmlFor=""></label>
            <FormSelect
              name="ageGroup"
              value={ ageGroup }
              invalid={ errors.hasOwnProperty('ageGroup') }
              onChange={ e => this.genericInputHandler(e) }>
              <option value="">Nothing selected</option>
              { options.map(o => <option key={ o } value={ o }>{ o }</option>) }
            </FormSelect>
          </FormGroup>
          <Button theme="success" className="float-right">Signup!</Button>
        </Form>
      </>
    );
  }
}

export default SignupForm;
