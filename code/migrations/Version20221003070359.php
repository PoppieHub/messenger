<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221003070359 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE chat (id BIGINT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, description TINYTEXT DEFAULT NULL, multi_chat TINYINT(1) DEFAULT 0 NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact (id BIGINT AUTO_INCREMENT NOT NULL, to_user_id BIGINT NOT NULL, from_user_id BIGINT NOT NULL, status TINYINT(1) DEFAULT 0 NOT NULL, INDEX IDX_4C62E63829F6EE60 (to_user_id), INDEX IDX_4C62E6382130303A (from_user_id), INDEX contact_idx (from_user_id, to_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content (id BIGINT AUTO_INCREMENT NOT NULL, user_id BIGINT NOT NULL, chat_id BIGINT DEFAULT NULL, link VARCHAR(255) NOT NULL, avatar TINYINT(1) DEFAULT 0 NOT NULL, UNIQUE INDEX UNIQ_FEC530A936AC99F1 (link), INDEX IDX_FEC530A91A9A7125 (chat_id), INDEX content_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE membership (id BIGINT AUTO_INCREMENT NOT NULL, chat_id BIGINT NOT NULL, user_id BIGINT NOT NULL, notification TINYINT(1) DEFAULT 0 NOT NULL, INDEX IDX_86FFD2851A9A7125 (chat_id), INDEX membership_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id BIGINT AUTO_INCREMENT NOT NULL, user_id BIGINT NOT NULL, chat_id BIGINT NOT NULL, body_message JSON NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_B6BD307FA76ED395 (user_id), INDEX message_idx (chat_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE read_message (id INT AUTO_INCREMENT NOT NULL, message_id BIGINT NOT NULL, user_id BIGINT NOT NULL, INDEX IDX_A5A52F3537A1329 (message_id), INDEX IDX_A5A52F3A76ED395 (user_id), INDEX read_idx (user_id, message_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE refresh_token (id INT AUTO_INCREMENT NOT NULL, user_id BIGINT NOT NULL, refresh_token VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX refresh_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id BIGINT AUTO_INCREMENT NOT NULL, email VARCHAR(128) NOT NULL, nickname VARCHAR(30) NOT NULL, first_name VARCHAR(30) DEFAULT NULL, last_name VARCHAR(30) DEFAULT NULL, password VARCHAR(255) NOT NULL, hide_email TINYINT(1) DEFAULT 0 NOT NULL, verified TINYINT(1) DEFAULT 0 NOT NULL, reset_token VARCHAR(100) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649A188FE64 (nickname), INDEX user_idx (email, nickname), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E63829F6EE60 FOREIGN KEY (to_user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E6382130303A FOREIGN KEY (from_user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A9A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A91A9A7125 FOREIGN KEY (chat_id) REFERENCES chat (id)');
        $this->addSql('ALTER TABLE membership ADD CONSTRAINT FK_86FFD2851A9A7125 FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE membership ADD CONSTRAINT FK_86FFD285A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F1A9A7125 FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE read_message ADD CONSTRAINT FK_A5A52F3A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE refresh_token ADD CONSTRAINT FK_C74F2195A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A91A9A7125');
        $this->addSql('ALTER TABLE membership DROP FOREIGN KEY FK_86FFD2851A9A7125');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F1A9A7125');
        $this->addSql('ALTER TABLE read_message DROP FOREIGN KEY FK_A5A52F3537A1329');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E63829F6EE60');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E6382130303A');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A9A76ED395');
        $this->addSql('ALTER TABLE membership DROP FOREIGN KEY FK_86FFD285A76ED395');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FA76ED395');
        $this->addSql('ALTER TABLE read_message DROP FOREIGN KEY FK_A5A52F3A76ED395');
        $this->addSql('ALTER TABLE refresh_token DROP FOREIGN KEY FK_C74F2195A76ED395');
        $this->addSql('DROP TABLE chat');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE membership');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE read_message');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
