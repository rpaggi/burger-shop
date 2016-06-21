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

INSERT INTO order_sources VALUES(1, "Salão");
INSERT INTO order_sources VALUES(2, "Balcão");
INSERT INTO order_sources VALUES(3, "Delivery");
INSERT INTO order_sources VALUES(4, "iFood");
INSERT INTO order_sources VALUES(5, "Outros");
