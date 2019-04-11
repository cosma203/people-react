import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/people';

export function getPeople() {
  return http.get(apiEndpoint);
}

export function deletePerson(person) {
  return http.delete(`${apiEndpoint}/${person._id}`);
}

export function getPerson(personId) {
  return http.get(`${apiEndpoint}/${personId}`);
}

export function savePerson(person) {
  if (person._id) {
    const body = { ...person };

    delete body._id;

    return http.put(`${apiEndpoint}/${person._id}`, body);
  }

  return http.post(apiEndpoint, person);
}
