
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.string('id');
        table.string('token');
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('avatar_link');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
