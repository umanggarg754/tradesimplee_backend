create table users
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    password    varchar(255)             not null,
    phone       varchar(255),
    email       varchar(255),
    linkedin    varchar(255),
    whatsapp    varchar(255),
    summary     varchar(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone not null
);

CREATE TABLE public.currencies (
	currency varchar NULL,
	conversion_value int4 NULL,
	id serial4 NOT NULL,
	CONSTRAINT currencies_pkey PRIMARY KEY (id)
);

create table orders
(
    id                   serial
        primary key,
    user_id              integer,
    contact_id           integer                  not null,
    status               varchar(255),
    summary              varchar(255),
    invoice_number       varchar(255),
    order_number         varchar(255),
    date                 date,
    customer_notes       varchar(255),
    terms_and_conditions varchar(255),
    currency             varchar(255)             not null,
    "createdAt"          timestamp with time zone not null
);


create table companies
(
    id           serial
        primary key,
    name         varchar(255) not null,
    iec_number   text,
    gst          text,
    pan          varchar(20),
    address      varchar(255),
    city         varchar,
    bank_details varchar
);


create table contacts
(
    id         serial
        primary key,
    name       varchar(255) not null,
    company    varchar(255),
    phone      varchar(20),
    email      varchar(255),
    linkedin   varchar(255),
    background text,
    user_id    integer,
    created_at timestamp,
    status     varchar(50),
    country    varchar,
    city       varchar,
    type       varchar
);


create table products
(
    order_id      integer,
    product_name  text             not null,
    price         double precision not null,
    quantity      double precision not null,
    status        text,
    photo         text,
    other_details jsonb,
    "createdAt"   timestamp,
    id            serial,
    serial_num    integer          not null
);



create table doc_templates
(
    id          serial
        primary key,
    user_id     integer,
    company_id  integer,
    name        text not null,
    details     json not null,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    type        text not null,
    constraint doc_template_name_company_unique
        unique (name, company_id)
);


create table user_companies
(
    user_id    integer,
    company_id integer,
    role       varchar,
    id         serial
        primary key
);


create table user_templates
(
    id          serial
        primary key,
    user_id     integer,
    company_id  integer,
    name        text not null,
    details     json not null,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    constraint template_name_company_unique
        unique (name, company_id)
);