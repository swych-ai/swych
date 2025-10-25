CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_name` text NOT NULL,
	`logo_url` text,
	`description` text,
	`website_url` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_name` text NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`testimonial` text NOT NULL,
	`rating` integer NOT NULL,
	`avatar_url` text,
	`created_at` text NOT NULL
);