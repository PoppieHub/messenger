<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220802234952 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact ADD to_user_id BIGINT NOT NULL, ADD from_user_id BIGINT NOT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E63829F6EE60 FOREIGN KEY (to_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E6382130303A FOREIGN KEY (from_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_4C62E63829F6EE60 ON contact (to_user_id)');
        $this->addSql('CREATE INDEX IDX_4C62E6382130303A ON contact (from_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E63829F6EE60');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E6382130303A');
        $this->addSql('DROP INDEX IDX_4C62E63829F6EE60 ON contact');
        $this->addSql('DROP INDEX IDX_4C62E6382130303A ON contact');
        $this->addSql('ALTER TABLE contact DROP to_user_id, DROP from_user_id, CHANGE id id BIGINT AUTO_INCREMENT NOT NULL');
    }
}
