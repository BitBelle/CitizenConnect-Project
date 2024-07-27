import { Request } from "express"

export interface PollRequest extends Request {
    body: {
        userId: string
        pollQuestion: string
        pollOptions: string
        pollStatus: string

    }
}

export interface Polls {
    pollsId: string
    userId: string
    pollQuestion: string
    pollOption: string
    pollStatus: string
    isDeleted: number
}