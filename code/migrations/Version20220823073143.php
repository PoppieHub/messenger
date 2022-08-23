<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220823073143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE read_message (id INT AUTO_INCREMENT NOT NULL, message_id BIGINT NOT NULL, user_id BIGINT NOT NULL, INDEX IDX_A5A52F3537A1329 (message_id), INDEX IDX_A5A52F3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3537A1329 FOREIGN KEY (message_id) REFERENCES message (id)');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE membership ADD roles LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\'');
        $this->addSql('ALTER TABLE message DROP is_read');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE read_message');
        $this->addSql('ALTER TABLE membership DROP roles');
        $this->addSql('ALTER TABLE message ADD is_read TINYINT(1) DEFAULT 0 NOT NULL');
    }
}
