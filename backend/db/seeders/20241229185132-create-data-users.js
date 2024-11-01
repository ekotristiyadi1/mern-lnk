'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const sql = `
    create extension if not exists "uuid-ossp";

    insert into public."users"(
        "id",
        "username", 
        "email", 
        "password", 
        "verified_at", 
        "created_at",
        "updated_at", 
        "deleted_at"
    ) values (
        uuid_generate_v4(),
        'eko',
        'eko@trimogo.com', 
        '$2b$10$7ylzNX2PwOmQC4cKjsW5d.0Qg/Zx7Kj07B2Av0BBX5WIU3wqhzPuO', 
        'now()', 
        'now()', 
        'now()', 
        null
    );
`;
module.exports = {
    async up(queryInterface, Sequelize) {
        // return await queryInterface.sequelize.query(sql);
        return queryInterface.bulkInsert('users', [
            {
                id: uuidv4(),
                username: 'eko',
                email: 'eko@trimogo.com',
                password: await bcrypt.hash('admin123', 10),
                verified_at: new Date(),
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            },
            // Add more users as needed
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
