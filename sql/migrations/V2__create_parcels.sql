-- CreateTable
CREATE TABLE "parcels" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "order_date" TIMESTAMP NOT NULL,
    "tracking_number" TEXT NOT NULL,
    "retoure" TEXT NOT NULL,
    "retoure_date" TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);