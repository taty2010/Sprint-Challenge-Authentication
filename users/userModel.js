const db = require('../database/dbConfig');

module.exports = {
  // find,
  findById,
  findBy,
  add,
}

function findBy(filter){
  return db('users'.where(filter)
}

function add(user){
  return db('users').insert(user)
}

function findById(id){
  return db('users')
    .where({id})
    .first();
}