export interface Employee {
    [key: string]: string | undefined | number;

    id?: number;
    departmentId: number | undefined;
    name: string;
    payRate: number;
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    Sunday: number;
}
