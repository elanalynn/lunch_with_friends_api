const knex = require('./knex');

module.exports = {
    getAll() {
        knex('users').where('id', id).then(users => users);
    },
    getOne(id) {
        knex('users').where('id', id).then(user => user);
    },
    saveOne(user) {
        knex('users').insert(user).returning('id').then(id => id);
    }
}