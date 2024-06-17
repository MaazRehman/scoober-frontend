export type CalculateRecordResult  = {
    step: number;
    equation: string;
    result: number;
    username: string;
}

export const calculateRecord = (number: number, selectedNumber: number, username: string) :CalculateRecordResult => {
    if (![1, 0, -1].includes(selectedNumber)) {
        throw new Error("The selectedNumber must be one of the following: 1, 0, -1");
    }

    if (!Number.isInteger(number)) {
        throw new Error("The number must be a whole number");
    }

    const step: number = selectedNumber;
    const isDivisibleBy3: boolean = (number + step) % 3 === 0;
    const result: number = isDivisibleBy3 ? (number + step) / 3 : number;

    const equation: string = `[ ( ${number} + ${step}) / 3 ] = ${isDivisibleBy3 ? result : number}`;

    return {
        step,
        equation,
        result,
        username
    };
};
