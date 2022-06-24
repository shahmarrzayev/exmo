import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndPostsTable1655982065603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE posts(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id) NOT NULL,
            title VARCHAR(512) NOT NULL,
            images VARCHAR(512) ARRAY,
            videos VARCHAR(512) ARRAY,
            content VARCHAR(65536),
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE comments(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            post_id INT REFERENCES posts(id) NOT NULL,
            parent_comment_id INT REFERENCES comments(id) NULL,
            content VARCHAR(65536) NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE posts_likes(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            post_id INT REFERENCES posts(id) NOT NULL,
            user_contact_id INT REFERENCES users_contact_info(id) NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        Create TABLE comments_likes(
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            comment_id INT REFERENCES comments(id) NOT NULL,
            user_contact_id INT REFERENCES users_contact_info(id) NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }
  //   CREATE TABLE users(
  //     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  //     first_name VARCHAR(255) NOT NULL,
  //     last_name VARCHAR(255) NOT NULL,
  //     phone_number VARCHAR(255) NOT NULL,
  //     username VARCHAR(255) NOT NULL,
  //     birth_date DATE NOT NULL,
  //     last_seen DATE NOT NULL,
  //     gender VARCHAR(255) NOT NULL,
  //     updated_at
  // );

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
