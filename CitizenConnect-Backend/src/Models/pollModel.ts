import { Request } from "express"

export interface PollRequest extends Request {
    body: {
        pollQuestion: string
        pollOptions: PollOption[]
        pollStatus: string

    }
}

export interface Polls {
    pollsId: string
    userId: string
    pollQuestion: string
    pollOption: string[]
    pollStatus: string
    isDeleted: number
}

export interface PollOption{
    optionId: string;
    optionText: string;
}