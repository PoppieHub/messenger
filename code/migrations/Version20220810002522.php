<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220810002522 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact CHANGE status status TINYINT(1) DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE membership CHANGE notification notification TINYINT(1) DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE message CHANGE is_read is_read TINYINT(1) DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE hide_email hide_email TINYINT(1) DEFAULT 0 NOT NULL, CHANGE verified verified TINYINT(1) DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact CHANGE status status TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE membership CHANGE notification notification TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE message CHANGE is_read is_read TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE `user` CHANGE hide_email hide_email TINYINT(1) NOT NULL, CHANGE verified verified TINYINT(1) NOT NULL');
    }
}
