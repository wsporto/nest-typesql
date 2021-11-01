import { Connection } from 'mysql2/promise';

export type SelectEmployeePhotoParams = {
    employeeId: number;
}

export type SelectEmployeePhotoResult = {
    Photo?: Buffer;
}

export async function selectEmployeePhoto(connection: Connection, params: SelectEmployeePhotoParams) : Promise<SelectEmployeePhotoResult | null> {
    const sql = `
    SELECT
        Photo
    FROM Employees
    WHERE EmployeeID = ?
    `

    return connection.query(sql, [params.employeeId])
        .then( res => res[0] as SelectEmployeePhotoResult[] )
        .then( res => res[0] );
}