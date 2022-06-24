import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndContactsTables1656085754118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            is_active BOOLEAN DEFAULT TRUE,
            latitude DOUBLE PRECISION,
            longitude DOUBLE PRECISION,
            phone_number VARCHAR(255) NOT NULL,
            verification_code VARCHAR(255) NOT NULL,
            verification_code_expiration_date TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )

        CREATE TABLE users_contact_info(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            contact_first_name VARCHAR(255) NOT NULL,
            contact_last_name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            birth_date DATE NOT NULL,
            last_seen DATE NOT NULL,
            gender VARCHAR(255) NOT NULL,
            stasuses VARCHAR(255),
            profile_image VARCHAR(255),
            refferal_code VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
