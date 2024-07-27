export interface Polls{
    pollsId: string
    userId: string
    pollQuestionId:string
    pollQuestion: string
    pollOption: string
    pollStatus: string
    isDeleted: number
}

export interface pollRequest{
    userId: string
    pollQuestion: string
    pollOption: string
    pollStatus: string

}


export interface pollResponse{
    message: string
}