import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';

class PeopleTable extends Component {
  columns = [
    {
      path: 'name',
      label: 'Name',
      content: person => <Link to={`/${person._id}`}>{person.name}</Link>
    },
    { path: 'surname', label: 'Surname' },
    { path: 'city', label: 'City' },
    { path: 'address', label: 'Address' },
    { path: 'phone', label: 'Phone' },
    { path: 'createdDate', label: 'Created Date' },
    {
      key: 'delete',
      content: person => (
        <button
          onClick={() => this.props.onDelete(person)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { people, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={people}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PeopleTable;
