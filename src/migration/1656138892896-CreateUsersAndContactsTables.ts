import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndContactsTables1656138892896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            is_active BOOLEAN DEFAULT TRUE,
            is_user BOOLEAN DEFAULT TRUE,
            latitude DOUBLE PRECISION,
            longitude DOUBLE PRECISION,
            phone_number VARCHAR(255) NOT NULL,
            verification_code VARCHAR(255) NOT NULL,
            verification_code_exp_date TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE contacts(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            birth_date DATE NOT NULL,
            last_seen DATE NOT NULL,
            gender VARCHAR(255) NOT NULL,
            profile_image VARCHAR(255),
            referral_code VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE users_contacts(
            user_id INT REFERENCES users(id),
            contact_id INT REFERENCES contacts(id),
            PRIMARY KEY (user_id, contact_id)
        );

        CREATE TABLE statuses(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id),
            url VARCHAR(255) NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
