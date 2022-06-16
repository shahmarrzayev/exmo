import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermissionsAndRolesTables1653834240175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE permissions(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(512) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE roles(
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(512) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE roles_permissions(
      role_id INT REFERENCES roles(id),
      permission_id INT REFERENCES permissions(id),
      PRIMARY KEY (role_id, permission_id)
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
