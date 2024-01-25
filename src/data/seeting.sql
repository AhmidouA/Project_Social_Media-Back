-- Insertion des utilisateurs
INSERT INTO "User" ("created_at", "firstName", "friends", "lastName", "location", "occupation", "picturePath", "viewedProfile")
VALUES
  ('2024-01-23 18:02:05.289', 'Henri', '{}', 'Leva', 'Canada, CA', 'Software Engineer', 'p4.jpeg', 6802),
  ('2024-01-24 07:24:08.038', 'Lola', '{}', 'Matin', 'New York, CA', 'Educator', 'p4.jpeg', 8712),
  ('2024-01-25 08:56:50.166', 'Marie', '{}', 'Joe', 'Los Angeles, CA', 'Hacker', 'p4.jpeg', 5042),
  ('2024-01-25 08:58:55.058', 'Laura', '{}', 'Hermit', 'Utah, CA', 'Journalist', 'p4.jpeg', 3399),
  ('2024-01-25 21:17:07.493', 'test', '{}', 'test', 'San Fran, CA', 'Software Engineer', 'p11.jpeg', 124),
  ('2024-01-25 21:17:20.002', 'Steve', '{}', 'Ralph', 'New York, CA', 'Degenerate', 'p3.jpeg', 5519),
  ('2024-01-25 21:18:21.665', 'Some', '{}', 'Guy', 'Canada, CA', 'Data Scientist Hacker', 'p4.jpeg', 9559),
  ('2024-01-25 21:18:36.732', 'Whatcha', '{}', 'Doing', 'Korea, CA', 'Educator', 'p6.jpeg', 5453),
  ('2024-01-25 21:18:54.123', 'Jane', '{}', 'Doe', 'Utah, CA', 'Hacker', 'p5.jpeg', 9724),
  ('2024-01-25 21:19:06.781', 'Harvey', '{}', 'Dunn', 'Los Angeles, CA', 'Journalist', 'p7.jpeg', 2197),
  ('2024-01-25 21:19:50.292', 'Carly', '{}', 'Vowel', 'Chicago, IL', 'Nurse', 'p8.jpeg', 5724),
  ('2024-01-25 21:20:03.749', 'Jessica', '{}', 'Dunn', 'Washington, DC', 'A Student', 'p9.jpeg', 2639);

-- Insertion des posts
INSERT INTO "Post" ("created_at", "description", "firstName", "friends", "id", "lastName", "likes", "location", "picturePath", "updatedAt", "userId", "userPicturePath")
VALUES
  (now(), 'Some really long random description', 'Steve', '{}', 1, 'Ralph', '{"5873":true,"6563":true,"7540":true,"8968":true}', 'New York, CA', 'post1.jpeg', now(), 6, 'p3.jpeg'),
  (now(), 'Another really long random description. This one is longer than the previous one.', 'Whatcha', '{}', 2, 'Doing', '{"2652":true,"5453":true,"5519":true,"6559":true}', 'Korea, CA', 'post2.jpeg', now(), 7, 'p6.jpeg'),
  (now(), 'This is the last really long random description. This one is longer than the previous one.', 'Jane', '{}', 3, 'Doe', '{"2652":true,"2197":true,"9724":true,"9724":true}', 'Utah, CA', 'post3.jpeg', now(), 8, 'p5.jpeg'),
  (now(), 'This is the last really long random description. This one is longer than the previous one. Man I''m bored. I''m going to keep typing until I run out of things to say.', 'Harvey', '{}', 4, 'Dunn', '{"2652":true,"2197":true,"9724":true}', 'Los Angeles, CA', 'post4.jpeg', now(), 9, 'p7.jpeg'),
  (now(), 'Just a short description. I''m tired of typing. I''m going to play video games now.', 'Carly', '{}', 5, 'Vowel', '{"2652":true,"2197":true,"9724":true,"9724":true}', 'Chicago, IL', 'post5.jpeg', now(), 10, 'p8.jpeg'),
  (now(), 'For the last time, I''m going to play video games now. I''m tired of typing. I''m going to play video games now.', 'Jessica', '{}', 6, 'Dunn', '{"2652":true,"6559":true}', 'Washington, DC', 'post6.jpeg', now(), 11, 'p9.jpeg');



