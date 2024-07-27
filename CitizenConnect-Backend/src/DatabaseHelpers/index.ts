import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql';
import { sqlConfig } from "../config";

export class DbHelper {
    private pool: Promise<ConnectionPool>;

    constructor() {
        this.pool = mssql.connect(sqlConfig);
    }

    private createRequest(emptyRequest: Request, data: { [x: string]: string | number }) {
        const keys = Object.keys(data);
        keys.map(key => {
            emptyRequest.input(key, data[key]);
        });
        return emptyRequest;
    }

    async exec(storedProcedure: string, data: { [x: string]: string | number }) {
        const emptyRequest = ((await this.pool).request());
        const request = this.createRequest(emptyRequest, data);
        const result = (await request.execute(storedProcedure));
        return result;
    }

    async query(queryString: string) {
        return (await ((await this.pool)).request().query(queryString));
    }


    public async storeResetToken(userEmail: string, resetToken: string, resetTokenExpiry: Date) {
        const pool = await this.pool;
        return pool.request()
            .input('userEmail', userEmail)
            .input('resetToken', resetToken)
            .input('resetTokenExpiry', resetTokenExpiry)
            .execute('storeResetToken');
    }

    public async getResetRecord(resetToken: string) {
        const pool = await this.pool;
        return pool.request()
            .input('resetToken', resetToken)
            .execute('getResetRecord');
    }

    public async updateUserPassword(userId: string, hashedPassword: string) {
        const pool = await this.pool;
        return pool.request()
            .input('userId', userId)
            .input('upassword', hashedPassword)
            .execute('updateUserPassword');
    }

    public async deleteResetToken(resetToken: string) {
        const pool = await this.pool;
        return pool.request()
            .input('resetToken', resetToken)
            .execute('deleteResetToken');
    }
}
