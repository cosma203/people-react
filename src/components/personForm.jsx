import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getPerson, savePerson } from '../services/peopleService';

class PersonForm extends Form {
  state = {
    data: {
      name: '',
      surname: '',
      city: '',
      address: '',
      phone: ''
    },

    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label('Name'),
    surname: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label('Surname'),
    city: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label('City'),
    address: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label('Address'),
    phone: Joi.string()
      .required()
      .regex(/\d{3}-\d{3}-\d{4}$/)
      .label('Phone')
      .error(() => {
        return { message: 'Please enter a valid phone number' };
      })
  };

  async populatePerson() {
    try {
      const personId = this.props.match.params.id;
      if (personId === 'new') return;

      const { data: person } = await getPerson(personId);

      this.setState({ data: this.mapToViewModel(person) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populatePerson();
  }

  mapToViewModel(person) {
    return {
      _id: person._id,
      name: person.name,
      surname: person.surname,
      city: person.city,
      address: person.address,
      phone: person.phone
    };
  }

  doSubmit = async () => {
    await savePerson(this.state.data);

    this.props.history.push('/');
  };

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h1 style={{ marginBottom: 20 }}>Person Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('surname', 'Surname')}
          {this.renderInput('city', 'City')}
          {this.renderInput('address', 'Address')}
          {this.renderInput('phone', 'Phone (format: xxx-xxx-xxxx)')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default PersonForm;
