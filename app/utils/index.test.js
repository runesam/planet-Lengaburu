import { expect } from 'chai';

import calculator from './calculator';

describe('Interest Calculator', () => {
    describe('Simple Interest Calculator', () => {
        const inputs = {
            principal: 10000,
            interestRate: 10,
            timePeriod: 5,
        };
        const args = Object.assign({}, inputs, { interestType: 'simple' });
        const simpleResult = calculator.calculate(args);
        it('gets the correct total simple interest', () => {
            const totalSimpleInterest = simpleResult.totals[0].value;
            const expected = Object.keys(inputs).reduce((a, c) => a * inputs[c], 1) / 100;
            expect(totalSimpleInterest).to.equal(expected);
        });
        it('gets the correct total simple amount', () => {
            const totalSimpleAmount = simpleResult.totals[1].value;
            const expected = (
                Object.keys(inputs).reduce((a, c) => a * inputs[c], 1) / 100
            ) + inputs.principal;
            expect(totalSimpleAmount).to.equal(expected);
        });
        it('returns the right number of items', () => {
            const itemsLength = simpleResult.details.data.length;
            expect(itemsLength).to.equal(inputs.timePeriod);
        });
    });
    describe('Compound Interest Calculator', () => {
        const inputs = {
            principal: 4000,
            interestRate: 8,
            timePeriod: 5,
            compoundFrequency: 6,
        };
        const args = Object.assign({}, inputs, { interestType: 'compound' });
        const compoundResult = calculator.calculate(args);
        const compoundCountPerYear = 12 / inputs.compoundFrequency;
        it('gets the correct total compound interest', () => {
            const totalSimpleInterest = compoundResult.totals[0].value;
            const expected = (inputs.principal * (
                (1 + (inputs.interestRate / (compoundCountPerYear * 100)))
                **
                (compoundCountPerYear * inputs.timePeriod)
            )) - inputs.principal;
            expect(totalSimpleInterest).to.equal(expected.toFixed(2));
        });
        it('gets the correct total compound amount', () => {
            const totalSimpleAmount = compoundResult.totals[1].value;
            const expected = (inputs.principal * (
                (1 + (inputs.interestRate / (compoundCountPerYear * 100)))
                **
                (compoundCountPerYear * inputs.timePeriod)
            )).toFixed(2);
            expect(totalSimpleAmount).to.equal(expected);
        });
        it('returns the right number of items', () => {
            const itemsLength = compoundResult.details.data.length;
            expect(itemsLength).to.equal(inputs.timePeriod);
        });
    });
});
