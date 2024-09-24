export const up = async (knex) => {
    // Create the users table
    await knex.schema.createTable('user', (table) => {
        table.increments('person_id').primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.date('date_of_birth').notNullable();
        table.enu('gender', ['Male', 'Female', 'Other']).notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('phone_number', 15).notNullable();
        table.text('address');
        table.enu('role', ['Student', 'Employee']).notNullable();
        table.string('student_id').unique().nullable(); // Made nullable
        table.string('employee_id').unique().nullable(); // Made nullable
        table.date('date_of_hire').nullable();
        table.integer('teaching_department_id').unsigned().nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').nullable();
    });

    // Create the enrollment table
    await knex.schema.createTable('enrollment', (table) => {
        table.increments('enrollment_id').primary();
        table.integer('person_id').unsigned().notNullable(); 
        table.integer('year_of_study').unsigned().notNullable();
        table.date('enrollment_date').notNullable();
        table.integer('current_semester').notNullable();
        table.string('branch', 100).notNullable();
        table.enu('status', ['Active', 'Inactive']).defaultTo('Active');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());

        // Set up the foreign key relationship
        table.foreign('person_id').references('person_id').inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

export const down = async (knex) => {
    // Drop the enrollment table first to avoid foreign key constraint issues
    await knex.schema.dropTableIfExists('enrollments'); // Corrected the table name
    await knex.schema.dropTableIfExists('users'); // Corrected the table name
};
