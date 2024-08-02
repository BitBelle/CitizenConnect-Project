export interface Polls{
    pollsId: string
    userId: string
    pollQuestionId:string
    pollQuestion: string
    pollOptions: PollOption[]
    pollStatus: string
    isDeleted: number
}


export interface PollOption{
    optionId: string;
    optionText: string;
}



export interface pollRequest{
    pollQuestion: string
    pollOptions: string[]
    pollStatus: string

}


export interface pollResponse{
    message: string
}