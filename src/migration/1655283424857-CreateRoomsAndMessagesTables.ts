import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoomsAndMessagesTables1655283424857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE messages(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,,
      message VARCHAR(65536) NOT NULL,
      from INT NOT NULL,
      to INT NOT NULL,
      media_url VARCHAR(512),
      is_read BOOLEAN DEFAULT FALSE,
      deleted_by INT ARRAY[2],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE rooms(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      from INT NOT NULL,
      to INT NOT NULL,
      is_deleted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE rooms_messages(
      room_id INT REFERENCES rooms(id),
      message_id INT REFERENCES messages(id),
      PRIMARY KEY (room_id, message_id)
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
