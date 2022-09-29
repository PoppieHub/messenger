<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220929011754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE INDEX contact_idx ON contact (from_user_id, to_user_id)');
        $this->addSql('ALTER TABLE content RENAME INDEX idx_fec530a9a76ed395 TO content_idx');
        $this->addSql('ALTER TABLE membership RENAME INDEX idx_86ffd285a76ed395 TO membership_idx');
        $this->addSql('ALTER TABLE message RENAME INDEX idx_b6bd307f1a9a7125 TO message_idx');
        $this->addSql('CREATE INDEX read_idx ON read_message (user_id, message_id)');
        $this->addSql('ALTER TABLE refresh_token RENAME INDEX idx_c74f2195a76ed395 TO refresh_idx');
        $this->addSql('CREATE INDEX user_idx ON user (email, nickname)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX contact_idx ON contact');
        $this->addSql('ALTER TABLE content RENAME INDEX content_idx TO IDX_FEC530A9A76ED395');
        $this->addSql('ALTER TABLE membership RENAME INDEX membership_idx TO IDX_86FFD285A76ED395');
        $this->addSql('ALTER TABLE message RENAME INDEX message_idx TO IDX_B6BD307F1A9A7125');
        $this->addSql('DROP INDEX read_idx ON read_message');
        $this->addSql('ALTER TABLE refresh_token RENAME INDEX refresh_idx TO IDX_C74F2195A76ED395');
        $this->addSql('DROP INDEX user_idx ON `user`');
    }
}
