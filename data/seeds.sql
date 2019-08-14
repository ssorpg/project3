USE tpn;

INSERT INTO Users (name, email, password)
VALUES('Jo Schmo', 'email@email.com', '12345'),
('Jennette Schmo', 'email2@email.com', '12345')
('Jeanie Schmo', 'email3@email.com', '12345')
('Jorje Schmo', 'email4@email.com', '12345')
('Porsche Richgirl', 'email5@email.com', '12345')
('Mazzie Richgirl', 'email5@email.com', '12345');

INSERT INTO Communities (name, founderId)
VALUES('Community #1', 1),
('Community #2', 4);

INSERT INTO Posts (title, authorId, message, score, CommunityId, EventId, UserId)
VALUES('The First Post', 1, 'The Message', 1, 1, null, null),
('The Second Post', 1, 'The Message', 1, 1, null, null)
('The Third Post', 1, 'The Message', 1, 1, null, null)
('The First Post for Event', 1, 'The Message', 1, 1, 1, null)
('The First Post for User 1', 1, 'The Message', 1, 1, 1, 1);
('The Second Post for User 1', 1, 'The Message', 1, 1, 1, 1);

INSERT INTO Events(name, founderId, date, CommunityId)
VALUES('The Big Event', 1, '1/1/0001'),
('The Bigger Event', 2, '1/1/0001')

INSERT INTO Comments(message, authorId, score, PostId)
VALUES('This is a comment!', 1, 1, 1),
('This is a comment!', 1, 1, 2),
('This is a comment!', 1, 1, 3),
('This is a comment!', 1, 1, 4),
('This is a comment!', 1, 1, 5),
('This is a comment!', 1, 1, 6);