const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('users').where('id', id).then(users => users);
    },
    getOne(id) {
        return knex('users').where('id', id).first().then(user => user);
    },
    saveOne(user) {
        return knex('users').insert(user).returning('id').then(id => id);
    }
}