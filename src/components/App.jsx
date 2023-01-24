import React from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const matchNameInput = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (matchNameInput) {
      alert(data.name + ' is already in contacts.');
    } else {
      this.setState(prev => ({ contacts: [...prev.contacts, data] }));
    }
  };

  handleDataUpdate = input => {
    this.setState({ filter: input });
  };

  filterContacts() {
    if (this.state.filter !== '') {
      return this.state.contacts.filter(contact =>
        contact.name
          .toLowerCase()
          .includes(this.state.filter.toLowerCase().trim())
      );
    } else {
      return this.state.contacts;
    }
  }

  onDeleteBtn = onDeleteBtn => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== onDeleteBtn
      ),
    }));
  };

  saveToLocalStorageContact() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  getFromLocalStorageContact() {
    const getLocalStorageContacts = JSON.parse(
      localStorage.getItem('contacts')
    );
    if (getLocalStorageContacts !== null) {
      this.setState({ contacts: getLocalStorageContacts });
    }
  }

  componentDidMount() {
    this.getFromLocalStorageContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveToLocalStorageContact();
    }
  }

  render() {
    return (
      <>
        <Form clickSubmit={this.formSubmitHandler} />

        <Filter onDataUpdate={this.handleDataUpdate} />

        <ContactsList
          arrContacts={this.filterContacts()}
          onDeleteBtn={this.onDeleteBtn}
        />
      </>
    );
  }
}
