import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoomsAndMessagesTables1655283424857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE messages(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(512) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE rooms(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(512) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE rooms_messages(
      role_id INT REFERENCES roles(id),
      permission_id INT REFERENCES permissions(id),
      PRIMARY KEY (role_id, permission_id)
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
