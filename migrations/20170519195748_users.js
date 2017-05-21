
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.integer('id');
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('avatar_link');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
