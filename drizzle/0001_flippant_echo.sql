ALTER TABLE `calculators` ADD `featured` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `calculators` ADD `external_url` text;--> statement-breakpoint
ALTER TABLE `calculators` ADD `requires_auth` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `calculators` ADD `metadata` text;