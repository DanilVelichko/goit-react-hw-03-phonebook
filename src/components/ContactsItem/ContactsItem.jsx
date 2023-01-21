import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsItem.module.css';

const ContactsItem = ({ id, name, number, onDeleteBtn }) => {
  return (
    <li className={css.contacts_item} id={id}>
      <div className={css.contacts_user}>
        <p className={css.contacts_name}>{name}: </p>
        <p>{number}</p>
      </div>
      <button className={css.button_delete} onClick={() => onDeleteBtn(id)}>
        Delete
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteBtn: PropTypes.func.isRequired,
};

export default ContactsItem;
