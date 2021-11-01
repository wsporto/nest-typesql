import { Connection } from 'mysql2/promise';

export type SelectEmployeesResult = {
    EmployeeID: number;
    FirstName: string;
    LastName: string;
    BirthDate?: Date;
}

export async function selectEmployees(connection: Connection) : Promise<SelectEmployeesResult[]> {
    const sql = `
    SELECT
        EmployeeID,
        FirstName,
        LastName,
        BirthDate
    FROM Employees
    `

    return connection.query(sql)
        .then( res => res[0] as SelectEmployeesResult[] );
}