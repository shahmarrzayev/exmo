import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoomsAndMessagesTables1656139314483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE rooms(
          id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          user_id INT REFERENCES users(id) NOT NULL,
          "to" INT NOT NULL,
          is_deleted BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE messages(
          id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          room_id INT REFERENCES rooms(id) NOT NULL,
          content VARCHAR(65536) NOT NULL,
          media_url VARCHAR(512),
          is_read BOOLEAN DEFAULT FALSE,
          deleted_by INT ARRAY[2],
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
