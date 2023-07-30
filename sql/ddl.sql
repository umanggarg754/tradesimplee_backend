CREATE TABLE public.currencies (
	currency varchar NULL,
	conversion_value int4 NULL,
	id serial4 NOT NULL,
	CONSTRAINT currencies_pkey PRIMARY KEY (id)
);

CREATE TABLE public.orders (
	id serial4 NOT NULL,
	user_id int4 NULL,
	contact_id int4 NULL,
	status text NULL,
	summary text NULL,
	invoice_number varchar NULL,
	order_number varchar NULL,
	customer_notes text NULL,
	terms_and_conditions text NULL,
	"createdAt" timestamp NULL,
	"date" date NULL,
	currency varchar NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id)
);


CREATE TABLE public.companies (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	ic_number text NULL,
	gst text NULL,
	pan varchar(20) NULL,
	address varchar(255) NULL,
	city varchar NULL,
	CONSTRAINT companies_pkey PRIMARY KEY (id)
);


CREATE TABLE public.contacts (
	id int4 NOT NULL DEFAULT nextval('leads_id_seq'::regclass),
	"name" varchar(255) NULL,
	company varchar(255) NULL,
	phone varchar(20) NULL,
	email varchar(255) NULL,
	linkedin varchar(255) NULL,
	background text NULL,
	user_id int4 NULL,
	created_at timestamp NULL,
	status varchar(50) NULL,
	country varchar NULL,
	city varchar NULL,
	"type" varchar NULL,
	CONSTRAINT leads_pkey PRIMARY KEY (id)
);

-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	order_id int4 NULL,
	product_name text NOT NULL,
	price text NULL,
	quantity text NULL,
	status text NULL,
	photo text NULL,
	other_details jsonb NULL,
	"createdAt" timestamp NULL,
	id serial4 NOT NULL,
	serial_num int4 NULL
);


