import { db } from '../firebase.js';

export const addItem = (userId, item) => {
   db.collection('users').doc(userId)
   .collection('sites').add(item)
}

export const removeItem = (userId, itemId) => {
   db.collection('users').doc(userId)
   .collection('sites').doc(itemId).delete()
}

export const updateItem = (userId, itemId, changes) => {
   db.collection('users').doc(userId)
   .collection('sites').doc(itemId)
   .update(changes)
}

export const listenItems = (userId, callback) => {
   return db.collection('users').doc(userId)
   .collection('sites')
   .onSnapshot((items) => {
      let list = []
      items.forEach(item => list.push({...item.data(), id: item.id}))
      callback(list)
   })
}