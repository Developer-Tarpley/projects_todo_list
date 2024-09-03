import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAccountFeatureUserstory1725302636639 implements MigrationInterface {
    name = 'CreateUsersAccountFeatureUserstory1725302636639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user_story" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "featureId" integer, CONSTRAINT "PK_cd6f5a48fae7109fbc55f19720e" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT IF NOT EXISTS "FK_65784c20d2a4562774fa196596c" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_65784c20d2a4562774fa196596c') THEN
                    ALTER TABLE "user_story"
                    ADD CONSTRAINT "FK_65784c20d2a4562774fa196596c"
                    FOREIGN KEY ("featureId") REFERENCES "feature"("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;
            END $$;
        `);
    }


    

    public async down(queryRunner: QueryRunner): Promise < void> {
    await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT IF EXISTS "FK_65784c20d2a4562774fa196596c"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_story"`);
}

}
