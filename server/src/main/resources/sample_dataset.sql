INSERT INTO `USER` (`ID`, `MANAGER_ID`, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `EMAIL`, `PASSWORD`, `LOCATION`, `STATUS`, `ENABLED`)
VALUES
	(1, NULL, 'SUPER ADMIN', '1', '1 Main Street', 'superadmin@methanex.com', '$2a$10$GNqgmYVm4mb4l/tgWOcVSuW3XfmgLaSn/UdRKdHfPYEuEfxDeM8hi', 'Vancouver', 'Available', 1),
	(2, NULL, 'PORTFOLIO MANAGER 1', '1', '1 Main Street', 'portfoliomanager1@methanex.com', '$2a$10$HGVd2Ary84RnwhaBDqEtP.S0.NpGTHAl5F6FmZnfrky5eE5dmSDku', 'Vancouver', 'Available', 1),
	(3, NULL, 'PORTFOLIO MANAGER 2', '2', '1 Main Street', 'portfoliomanager2@methanex.com', '$2a$10$jFL6r8.jivZX5yvI4WEyJOsZUkGfI7I5qgbNWOxo9s60m75ftuk7q', 'Vancouver', 'Available', 1),
	(4, NULL, 'PROJECT MANAGER 1', '1', '1 Main Street', 'projectmanager1@methanex.com', '$2a$10$Qtixd6gaRJLdFDUKqeuOoulTA6UKNQLpl7jq33P1/n3cz2nibWsIy', 'Vancouver', 'Available', 1),
	(5, NULL, 'PROJECT MANAGER 2', '2', '1 Main Street', 'projectmanager2@methanex.com', '$2a$10$eJthODeoPHC9x1YyJePpouyodtY791D.dk45CJPAZdqEkCNBbobyO', 'Vancouver', 'Available', 1),
	(6, NULL, 'RESOURCE MANAGER 1', '1', '1 Main Street', 'resourcemanager1@methanex.com', '$2a$10$/ZG3c8MTESHolKh9I9Fvs.GgFe53BwnWs2GE.BlUDE/S1bQDjSQN.', 'Vancouver', 'Available', 1),
	(7, NULL, 'RESOURCE MANAGER 2', '2', '1 Main Street', 'resourcemanager2@methanex.com', '$2a$10$TvkNr.rpUA9neUa702p5q.Vc45s5FAqLUXCRAPUITfCYg7wXX5SHC', 'Vancouver', 'Available', 1),
	(8, 6, 'RESOURCE 1', '1', '1 Main Street', 'resource1@methanex.com', '$2a$10$730TwyHskzXtUe8bV/Pd1OovbQj12SjgdhzY2LIrt2A8fSn43Atq2', 'Vancouver', 'Available', 1),
	(9, 6, 'RESOURCE 2', '2', '1 Main Street', 'resource2@methanex.com', '$2a$10$s.zFZ94HN/G7BLuCa5vufew1P2CDZq7Wr4RyxyWZrNI9ZaLMhQRei', 'Vancouver', 'Available', 1),
	(10, 7, 'RESOURCE 3', '3', '1 Main Street', 'resource3@methanex.com', '$2a$10$6brIMCxwm4XT0PPQYxUwo..dY3ZnGxbkQePynguqXRqQ11BxtSL2i', 'Vancouver', 'Available', 1),
	(11, 7, 'RESOURCE 4', '4', '1 Main Street', 'resource4@methanex.com', '$2a$10$foyOHHoNRoQAaU0mNEJk5ORlyMVM51xYv.kMANMviaB0fUi4Tu752', 'Vancouver', 'Available', 1);

INSERT INTO `USER_ROLE` (`ID`, `USER_ID`, `ROLE`)
VALUES
	(1, 1, 'SUPER_ADMIN'),
	(2, 2, 'PORTFOLIO_MANAGER'),
	(3, 3, 'PORTFOLIO_MANAGER'),
	(4, 4, 'PROJECT_MANAGER'),
	(5, 5, 'PROJECT_MANAGER'),
	(6, 6, 'RESOURCE_MANAGER'),
	(7, 7, 'RESOURCE_MANAGER'),
	(8, 8, 'RESOURCE'),
	(9, 9, 'RESOURCE'),
	(10, 10, 'RESOURCE'),
	(11, 11, 'RESOURCE');

INSERT INTO `SKILL_CATEGORY` (`ID`, `NAME`)
VALUES
	(1, 'Technical (Languages)'),
	(2, 'Technical (Frameworks)'),
	(3, 'Soft Skills');

INSERT INTO `SKILL_TYPE` (`ID`, `NAME`, `SKILL_CATEGORY_ID`)
VALUES
	(1, 'Java', 1),
	(2, 'Javascript', 1),
	(3, 'React', 2),
	(4, 'Node.js', 2),
	(5, 'Spring', 2),
	(6, 'Communication', 3),
	(7, 'Presentation', 3),
	(8, 'Collaboration', 3);

INSERT INTO `USER_SKILL` (`ID`, `USER_ID`, `SKILL_TYPE_ID`, `COMPETENCY`)
VALUES
	(1, 2, 6, 5),
	(2, 2, 7, 4),
	(3, 2, 8, 5),
	(4, 3, 6, 4),
	(5, 3, 7, 4),
	(6, 3, 8, 4),
	(7, 4, 6, 3),
	(8, 4, 7, 4),
	(9, 4, 8, 3),
	(10, 5, 6, 4),
	(11, 5, 7, 5),
	(12, 5, 8, 4),
	(13, 6, 1, 5),
	(14, 6, 2, 5),
	(15, 6, 3, 5),
	(16, 6, 4, 5),
	(17, 6, 5, 5),
	(18, 6, 6, 5),
	(19, 6, 7, 4),
	(20, 6, 8, 5),
	(21, 7, 6, 5),
	(22, 7, 7, 5),
	(23, 7, 8, 5),
	(24, 8, 1, 5),
	(25, 8, 2, 5),
	(26, 8, 3, 5),
	(27, 8, 4, 5),
	(28, 8, 5, 5),
	(29, 8, 6, 5),
	(30, 8, 7, 5),
	(31, 8, 8, 5),
	(32, 9, 1, 2),
	(33, 9, 2, 5),
	(34, 9, 3, 4),
	(35, 9, 4, 3),
	(36, 9, 6, 4),
	(37, 9, 7, 4),
	(38, 9, 8, 4),
	(39, 10, 6, 5),
	(40, 10, 7, 4),
	(41, 10, 8, 5),
	(42, 11, 6, 4),
	(43, 11, 7, 4),
	(44, 11, 8, 5);

INSERT INTO `CLASSIFICATION` (`ID`, `NAME`)
VALUES
	(1, 'IT'),
	(2, 'Marketing');

INSERT INTO `PORTFOLIO` (`ID`, `MANAGER_ID`, `CLASSIFICATION_ID`, `NAME`, `RAG_STATUS`)
VALUES
	(1, 2, 1, 'Product', 'AMBER'),
	(2, 3, 2, 'Marketing', 'GREEN');

INSERT INTO `PROJECT` (`ID`, `PORTFOLIO_ID`, `NAME`, `PROJECT_STATUS`, `RAG_STATUS`, `BUDGET`, `SPENT_TO_DATE`, `ESTIMATE_TO_COMPLETE`, `MANAGER_ID`, `COMPLETE`, `START_DATE`, `END_DATE`, `GANTT_CHART`)
VALUES
	(1, 1, 'Sales Tracker', 'UNDERWAY', 'AMBER', 10000.00, 7000.00, 5000.00, 4, 0, '2018-03-01', '2018-04-30', NULL),
	(2, 1, 'Analytics Software', 'PRE_APPROVAL', 'RED', 0.00, 0.00, 0.00, 4, 0, '2018-05-01', '2018-08-31', NULL),
	(3, 2, 'Increase Sales by 10%', 'UNDERWAY', 'RED', 50000.00, 20000.00, 30000.00, 5, 0, '2018-01-01', '2018-12-31', NULL),
	(4, 2, 'Increase Brand Awareness by 15%', 'SEEKING_FUNDING', 'AMBER', 0.00, 0.00, 0.00, 5, 0, '2018-06-01', '2018-12-31', NULL);

INSERT INTO `PROJECT_RESOURCE` (`ID`, `PROJECT_ID`, `RESOURCE_ID`, `ASSIGNED_HOURS`, `APPROVED`)
VALUES
	(1, 1, 8, 100, 0),
	(2, 1, 9, 150, 1),
	(3, 2, 8, 200, 1),
	(4, 3, 10, 300, 1),
	(5, 3, 11, 400, 0);
