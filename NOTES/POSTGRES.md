# Postgres notes

__NOTE: DO NOT FORGET SEMI-COLONS WHEN TYPING SQL COMMAND IN THE CLI!__

```bash

# create a user with the psql installed createuser command
## -d gives the new user ability to creat databases
createuser someuser -d

# cli
psql
## Log in with user someuser to template1 database
psql -U someuser template1
## Log in with user someuser to sb_clean_blog_local database
psql -U someuser sb_clean_blog_local

# list databases
\l

# change databases
\c sb_clean_blog_specs

# list tables
\dt

# list table detail
\d+ user

# get data
select * from "user";

# delete all content from table
truncate table "user";

# drop table
drop table "user"

```
