-- Command to import:
-- mysql -uroot -p --default-character-set=utf8 burgershop < initialize-system.sql

INSERT INTO profiles VALUES(1, "Root");
INSERT INTO profiles VALUES(2, "Administrador");
INSERT INTO profiles VALUES(3, "Balcão");
INSERT INTO profiles VALUES(4, "Salão");

INSERT INTO logins VALUES(
  null,
  "Administrador",
  "admin",
  "21232f297a57a5a743894a0e4a801fc3",
  1,
  null,
  current_timestamp,
  current_timestamp
);
