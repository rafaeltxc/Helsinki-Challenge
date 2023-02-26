import axios from 'axios';

const findAll = () => {
    return axios.get('https://restcountries.com/v3.1/all')
        .then(response => response.data)
        .catch(err => console.log(err))
}

export {
    findAll
}
