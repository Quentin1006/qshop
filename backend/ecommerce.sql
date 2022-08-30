CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "role_id" int,
  "created_at" timestamp
);

CREATE TABLE "role" (
  "id" int,
  "name" varchar
);

CREATE TABLE "permission" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "basket" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "nb_items" int,
  "status" int,
  "total_price" decimal,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "product_in_basket" (
  "id" int,
  "status" int,
  "product_id" int,
  "basket_id" int,
  "quantity" int
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "image_link" varchar
  "price" decimal,
  "title" varchar,
  "description" varchar,
  "rate" decimal
);

CREATE TABLE "tag" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "payment" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "amount" decimal,
  "type" int
);

CREATE TABLE "shipping" (
  "id" SERIAL PRIMARY KEY,
  "method" int,
  "transporter_id" int,
  "fee" decimal
);

CREATE TABLE "transporter" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "deliver_address" (
  "id" SERIAL PRIMARY KEY,
  "number" varchar,
  "street" varchar,
  "city" varchar,
  "zipcode" varchar,
  "country" varchar
);

CREATE TABLE "sav_tickets" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "reason" int,
  "order_id" int
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "payment_id" int,
  "basket_id" int,
  "user_id" int,
  "shipping_id" int,
  "deliver_address_id" int,
  "contact_email" varchar,
  "step_id" int,
  "state" int
);

CREATE TABLE "role_permission" (
  "role_id" int NOT NULL,
  "permission_id" int NOT NULL,
  PRIMARY KEY ("role_id", "permission_id")
);

ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");


ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "basket" ("user_id");

ALTER TABLE "product_in_basket" ADD FOREIGN KEY ("basket_id") REFERENCES "basket" ("id");

ALTER TABLE "product_in_basket" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

CREATE TABLE "tag_product" (
  "tag_id" int NOT NULL,
  "product_id" int NOT NULL,
  PRIMARY KEY ("tag_id", "product_id")
);

ALTER TABLE "tag_product" ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("id");

ALTER TABLE "tag_product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");


ALTER TABLE "transporter" ADD FOREIGN KEY ("id") REFERENCES "shipping" ("transporter_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "order" ("user_id");

ALTER TABLE "basket" ADD FOREIGN KEY ("id") REFERENCES "order" ("basket_id");

ALTER TABLE "payment" ADD FOREIGN KEY ("id") REFERENCES "order" ("payment_id");

ALTER TABLE "deliver_address" ADD FOREIGN KEY ("id") REFERENCES "order" ("deliver_address_id");

ALTER TABLE "shipping" ADD FOREIGN KEY ("id") REFERENCES "order" ("shipping_id");

ALTER TABLE "order" ADD FOREIGN KEY ("id") REFERENCES "sav_tickets" ("order_id");
