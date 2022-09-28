<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220923225844 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE read_message DROP FOREIGN KEY FK_A5A52F3537A1329');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE read_message DROP FOREIGN KEY FK_A5A52F3537A1329');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
