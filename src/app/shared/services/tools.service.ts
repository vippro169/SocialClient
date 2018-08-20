import { Injectable } from "@angular/core";


@Injectable()
export class ToolsService {
    public isEmail(email: string): boolean {
        return /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email);
    }

    public isNullOrEmpty(value: string | null | undefined): boolean {
        return value == null || value.trim() == '';
    }

    public isValidDate(day: number, month: number, year: number): boolean {
        var isLeapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
        if (day < 1 || month < 1 || month > 12 || !Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
        if (month == 2) return isLeapYear ? (day <= 29) : (day <= 28);
        else if ([4, 6, 9, 11].includes(month)) return day <= 30;
        else return day <= 31;
    }
}