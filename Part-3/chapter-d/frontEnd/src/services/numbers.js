import axios from "axios";

function getAll(url) {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getById(url, id) {
  return axios
    .get(`${url}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function post(url, data) {
  return axios.post(url, data).then((response) => {
    return response;
  });
}

function deletePersons(url, id) {
  return axios.delete(`${url}/${id}`);
}

function update(url, id, data) {
  return axios
    .put(`${url}/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export default {
  getAll,
  getById,
  post,
  deletePersons,
  update,
};
