import axios from 'axios';
require('dotenv').config();

export const realtor = {
  async getAddressDetails(propertyid) {
    let getaddressResponse;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v2/detail',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        property_id: `${propertyid}`,
      },
    })
      .then((response) => {
        getaddressResponse = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return getaddressResponse;
  },

  async gethousevalue(cityfirestore, statefirestore) {
    let houseresponse;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v2/list-sold',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        sort: 'sold_date',
        city: `${cityfirestore}`,
        offset: '0',
        state_code: `${statefirestore}`,
        limit: '100',
      },
    })
      .then((response) => {
        houseresponse = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return houseresponse;
  },
};
