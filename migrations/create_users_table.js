export const up = async (knex) => {
    await knex.schema.createTable('people', (table) => {
      table.increments('person_id').primary();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.date('date_of_birth').notNullable();
      table.enu('gender', ['Male', 'Female', 'Other']).notNullable();
      table.string('email', 100).unique().notNullable();
      table.string('phone_number', 15).notNullable();
      table.text('address');
      table.enu('role', ['Student', 'Employee']).notNullable();
      table.integer('student_id').unsigned().unique().nullable();
      table.date('enrollment_date').nullable();
      table.integer('year_of_study').nullable();
      table.integer('current_semester').nullable();
      table.string('branch', 100).nullable();
      table.enu('status', ['Active', 'Inactive']).defaultTo('Active');
      table.integer('employee_id').unsigned().unique().nullable();
      table.date('date_of_hire').nullable();
      table.integer('teaching_department_id').unsigned().nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  export const down = async (knex) => {
    await knex.schema.dropTableIfExists('people');
  };
