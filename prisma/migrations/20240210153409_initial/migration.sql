-- CreateTable
CREATE TABLE "Plugin" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "c_version" TEXT NOT NULL,
    "l_version" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "retired" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Plugin_pkey" PRIMARY KEY ("id")
);
