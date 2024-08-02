import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../DatabaseHelpers';
import { PollSchema } from '../inputValidation/pollValidation';
import { PollRequest } from '../Models/pollModel';

const dbInstance = new DbHelper();

export const addPoll = async (req: PollRequest, res: Response) => {
    try {
        const { error } = PollSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: "Poll Input Validation Failed!", error: error.details });
        }

        const { pollQuestion, pollOptions, pollStatus } = req.body;

        if (!pollQuestion || !pollOptions || !pollStatus) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const pollQuestionId = uid();

        // Add poll question
        await dbInstance.exec('addPollQuestion', {
            pollQuestionId,
            pollQuestion,
            pollStatus
        });

        // Add poll options
        for (const optionText of pollOptions) {
            const optionId = uid();
            await dbInstance.exec('addPollOption', {
                optionId,
                pollQuestionId,
                optionText
            });
        }

        return res.status(201).json({ message: "Poll Created Successfully" });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }
}


export const getPollsWithOptions: RequestHandler = async (req, res)=> {
    try {
        const result = await dbInstance.exec('getPollsWithOptions', {});

        const pollsWithOptions = result.recordset.reduce((acc: any, row: any) => {
            let poll = acc.find((item: any) => item.pollQuestionId === row.pollQuestionId);
            
            if (!poll) {
                poll = {
                    pollQuestionId: row.pollQuestionId,
                    // userId: row.userId,
                    pollQuestion: row.pollQuestion,
                    pollStatus: row.pollStatus,
                    options: []
                };
                acc.push(poll);
            }

            if (row.optionId) {
                poll.options.push({
                    optionId: row.optionId,
                    optionText: row.optionText
                });
            }

            return acc;
        }, []);

        return res.status(200).json(pollsWithOptions);

    } catch (error) {
        return res.status(500).json(error);
    }
}



export const deletePoll: RequestHandler = async (req, res) => {
    try {
        const { pollQuestionId } = req.params;

        if (!pollQuestionId) {
            return res.status(400).json({ message: "PollQuestionId is required" });
        }
 
        await dbInstance.exec('deletePoll', { pollQuestionId });

        return res.status(200).json({ message: "Poll and its options deleted successfully" });
        

    } 
      
    catch (error) {
        return res.status(500).json(error);
    }
};
