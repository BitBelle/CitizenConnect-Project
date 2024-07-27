import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql';
import { sqlConfig } from "../Config";

export class DBHelper {
    private pool: Promise<ConnectionPool>
    constructor() {
        this.pool = mssql.connect(sqlConfig);
    }

    private createRequest(emptyRequest: Request, data: { [x: string]: string | number }) {
        const keys = Object.keys(data);
        keys.map(key => {
            emptyRequest.input(key, data[key]);
        })
        return emptyRequest;
    }

    async exec(storedProcedure: string, data: { [x: string]: string | number }) {
        const emptyRequest = ((await this.pool).request())
        const request = this.createRequest(emptyRequest, data)
        const result = (await request.execute(storedProcedure))

        return result;
    }

    async query(queryString: string) {
        return (await ((await this.pool)).request().query(queryString));
    }

}