# username: billgates
# password: 2aNJn29r
#
# username: stevejobs
# password: F7zKwGg2
#
# username: markzuckerberg
# password: Zqq37aDT
#
# username: admin
# password: F7zKwGg2

INSERT INTO `activities` (idActivity, name) VALUES (1, 'invited'), (2, 'accepted'), (3, 'denied'), (4, 'confirmed');

INSERT INTO `statuses` (idStatus, name) VALUES (1, 'active'), (2, 'in progress'), (3, 'archived');

INSERT INTO `levels` (idLevel, name) VALUES (1, 'easy'), (2, 'medium'), (3, 'hard');

INSERT INTO `users` (username, password, email, firstName, lastName, role) VALUES ('admin','$2a$10$s4Fsgj.U6Cql.3i7BD90VuDNWHwRW6G.gf3N781B47FrEcmXGk2NO','biketrips.admin@gmail.com','admin','admin','ADMIN');

INSERT INTO `users` (username, password, email, firstName, lastName, role) VALUES('stevejobs','$2a$10$s4Fsgj.U6Cql.3i7BD90VuDNWHwRW6G.gf3N781B47FrEcmXGk2NO','steve@jobs','Steve','Jobs','MODER');

INSERT INTO `users`(username, password, email, firstName, lastName, role) VALUES ('markzuckerberg','$2a$10$tgIejFFdFbHBL4yj/XMBu.Cy1yF0b5d0bcffY22SvOia8h60gEUWe','mark@zuckerberg','Mark','Zuckerberg','USER');

INSERT INTO `users`(username, password, email, firstName, lastName, role) VALUES ('billgates','$2a$10$FHaBC.T3KevsXXVOtWKB4OhX.HcrxK63RHzm9SCXmeP/Agbvn/b..','bill@gates','Bill','Gates','USER');

INSERT INTO `users`(username, password, email, firstName, lastName, role) VALUES ('annacuk','$2a$10$lBHNgZqayknupvmxIAiqNeUDlGxhVnEffVNUJ3YqTXmyZEUBMR2xe','ann@cuk','Anna','Cuk','MODER');

INSERT INTO applications (username, email, isActive) VALUES('markzuckerberg','mark@zuckerberg',true),('stevejobs','steve@jobs',false);

INSERT INTO `trips` (name, startDate, endDate, idLevel, idStatus, description, points, moderator) VALUES ('wycieczka','2018-09-01 00:00:00', '2018-09-02 00:00:00', '2','3','bkjsanbjksabjdsak', '45', 'stevejobs');


