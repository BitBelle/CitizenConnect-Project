-- CREATE OR ALTER PROCEDURE getPollsWithOptions
-- AS
-- BEGIN
--     SELECT
--         pq.pollQuestionId,
--         pq.userId,
--         pq.pollQuestion,
--         pq.pollStatus,
--         po.optionId,
--         po.optionText
--     FROM PollQuestion pq
--     LEFT JOIN PollOptions po ON pq.pollQuestionId = po.pollQuestionId
--     WHERE pq.isDeleted = 0
-- END;

CREATE OR ALTER PROCEDURE getPollsWithOptions
AS
BEGIN
    SELECT
        pq.pollQuestionId,
        pq.pollQuestion,
        pq.pollStatus,
        po.optionId,
        po.optionText
    FROM
        PollQuestion pq
    LEFT JOIN
        PollOptions po
    ON
        pq.pollQuestionId = po.pollQuestionId
    WHERE
        pq.isDeleted = 0 AND (po.isDeleted = 0 OR po.isDeleted IS NULL)
    ORDER BY
        pq.pollQuestionId;
END;
