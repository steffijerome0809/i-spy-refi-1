import {firestore as db} from '../firebase.js';

export const DB = {

  // ------------------------ GET ------------------------
  async getUser(id){
    let returnedUser;
    const user = db.collection('users').doc(id);
    try {
      returnedUser = await user.get();
    }
    catch(err) {
      console.log(err)
    }
    const userObj = await returnedUser;
    const data = {
      id: userObj.id,
      email: userObj.data().email ? userObj.data().email : undefined,
      firstName: userObj.data().firstName ? userObj.data().firstName : undefined,
      lastName: userObj.data().lastName ? userObj.data().lastName : undefined
    }
    return data;
  },

  async getUsers(){
    let returnedUsers;
    const usersList = db.collection('users');
    try {
      returnedUsers = await usersList.get();
    }
    catch(err) {
      console.log(err)
    }
    const users = await returnedUsers;
    //todo break this off into a reusable func seeing as this shit is gonna happen a bunch
    const usersArr = [];
    users.forEach(user => {
      // todo does this enforcing of data model belong here?
      const data = {
        id: user.id,
        email: user.data().email,
        firstName: user.data().firstName,
        lastName: user.data().lastName
      }
      usersArr.push(data) 
    })
    return usersArr;
  },

  async getHouse(id){
    let returnedHouse;
    const house = db.collection('houses').doc(id);
    try {
      returnedHouse = await house.get();
    }
    catch(err) {
      console.log(err)
    }
    const houseObj = await returnedHouse;
    const data = {
      id: houseObj.id,
      value: houseObj.data().value,
      zpid: houseObj.data().zpid,
    }
    return data;
  },

  async getHouses(){
    let returnedHouses;
    const housesList = db.collection('houses');
    try {
      returnedHouses = await housesList.get();
    }
    catch(err) {
      console.log(err)
    }
    const houses = await returnedHouses;
    //todo break this off into a reusable func seeing as this shit is gonna happen a bunch
    const housesArr = [];
    houses.forEach(house => {
      // todo does this enforcing of data model belong here?
      const data = {
        id: house.id,
        value: house.data().value,
        zpid: house.data().zpid
      }
      housesArr.push(data) 
    })
    return housesArr;
  },

  // ------------------------ UPDATE ------------------------


// ------------------------ EXAMPLES ------------------------

  // const housesList = db.collection('houses');
  // const query = housesList.where('value', '>', 100000);
  // const query = housesList.orderBy('value', 'desc');
  // query.get().then(houses => {...})

  // const myHouse = db.collection('houses').doc('JWb8oyGegTY1HCi9XcaX');
  // myHouse.get().then(doc => {...})

  // AUTO UPDATE references to the DB on the frontend, SO A CHANGE IN DB AUTO CHANGES THE FRONT
  // myHouse.onSnapshot(doc => { ... })

  // NORMAL UPDATE
  // myHouse.update({value: event.target.value})

// ------------------------ EXAMPLE MODIFYING DB from FUNCTIONS ------------------------
// exports.sendMessage = functions.firestore
//   .document('houses/{houseID}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;
//     const value = snap.data().original.value;
//     functions.logger.log('sending message', context.params.houseID, context);
//     return snap.ref.update({message: `Yolo! called from cloud function`}, {merge: true});
//   })

};