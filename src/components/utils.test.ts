// calculateRecord.test.ts
import { calculateRecord, CalculateRecordResult } from './utils';

describe('calculateRecord', () => {
    it('should return correct result when number + step is divisible by 3', () => {
        const result: CalculateRecordResult = calculateRecord(5, 1, 'testUser');
        expect(result).toEqual({
            step: 1,
            equation: '[ ( 5 + 1) / 3 ] = 2',
            result: 2,
            username: 'testUser'
        });
    });

    it('should return correct result when number + step is not divisible by 3', () => {
        const result: CalculateRecordResult = calculateRecord(5, 0, 'testUser');
        expect(result).toEqual({
            step: 0,
            equation: '[ ( 5 + 0) / 3 ] = 5',
            result: 5,
            username: 'testUser'
        });
    });

    it('should throw error when selectedNumber is not one of [1, 0, -1]', () => {
        expect(() => calculateRecord(5, 2, 'testUser')).toThrowError("The selectedNumber must be one of the following: 1, 0, -1");
    });

    it('should throw error when number is not a whole number', () => {
        expect(() => calculateRecord(5.5, 1, 'testUser')).toThrowError("The number must be a whole number");
    });

    it('should handle negative numbers correctly', () => {
        const result: CalculateRecordResult = calculateRecord(-5, -1, 'testUser');
        expect(result).toEqual({
            step: -1,
            equation: '[ ( -5 + -1) / 3 ] = -2',
            result: -2,
            username: 'testUser'
        });
    });

    it('should handle zero correctly', () => {
        const result: CalculateRecordResult = calculateRecord(0, 1, 'testUser');
        expect(result).toEqual({
            step: 1,
            equation: '[ ( 0 + 1) / 3 ] = 0',
            result: 0,
            username: 'testUser'
        });
    });
});
