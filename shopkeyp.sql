\echo 'Delete and recreate shopkeyp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE shopkeyp;
CREATE DATABASE shopkeyp;
\connect shopkeyp

\i shopkeyp-schema.sql
\i shopkeyp-seed.sql

\echo 'Delete and recreate shopkeyp_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE shopkeyp_test;
CREATE DATABASE shopkeyp_test;
\connect shopkeyp_test

\i shopkeyp-schema.sql