import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PeopleTable from './peopleTable';
import Pagination from './common/pagination';
import { getPeople, deletePerson } from '../services/peopleService';
import { paginate } from '../utils/paginate';

class People extends Component {
  state = {
    people: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'name', order: 'asc' }
  };

  async componentDidMount() {
    const { data: people } = await getPeople();

    this.setState({ people });
  }

  handleDelete = async person => {
    const originalPeople = this.state.people;
    const people = originalPeople.filter(p => p._id !== person._id);
    this.setState({ people });

    try {
      await deletePerson(person);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This person has already been deleted.');

      this.setState({ people: originalPeople });
    }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { people: allPeople, sortColumn, currentPage, pageSize } = this.state;
    const { length: peopleCount } = allPeople;
    const sorted = _.orderBy(allPeople, [sortColumn.path], [sortColumn.order]);
    const people = paginate(sorted, currentPage, pageSize);

    if (peopleCount === 0)
      return (
        <div className="container">
          <Link
            to="/new"
            className="btn btn-dark"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            New Person
          </Link>
          <h1>Currently,there are no people in the database.</h1>
        </div>
      );

    return (
      <div className="container">
        <Link
          to="/new"
          className="btn btn-dark"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          New Person
        </Link>
        <p>
          Showing {peopleCount} {peopleCount > 1 ? 'people' : 'person'} in the
          database.
        </p>
        <PeopleTable
          people={people}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          onPageChange={this.handlePageChange}
          itemsCount={peopleCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    );
  }
}

export default People;
