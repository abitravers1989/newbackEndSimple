const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const getEnvVar = require('./getEnvVar');

describe.only('getEnvVar', () => {
    describe('when the requested env variable is found', () => {
        it('returns the value', () => {
            const MOCK_ENV_VARIABLE = 'MOCK_ENV_VARIABLE';
            const mockVariableValue = 'test';
            process.env[MOCK_ENV_VARIABLE] = mockVariableValue;
            expect(getEnvVar('MOCK_ENV_VARIABLE')).to.equal(mockVariableValue)
        });
    });

    describe('when the requested env variable has an invalid value', () => {
        describe('when the value is undefined', () => {
            it('throws an error', () => {
                const nonExistenetVariable = 'undefined';
                expect(() => {
                    getEnvVar(nonExistenetVariable);
                  }).to.throw(
                    ReferenceError,
                    `Environment variable ${nonExistenetVariable} is required`,
                  );
            });
        });

        describe('when the value is an empty string', () => {
            it('throws an error', () => {
                const MOCK_ENV_VARIABLE = 'MOCK_ENV_VARIABLE';
                process.env[MOCK_ENV_VARIABLE] = '';
                expect(() => {
                    getEnvVar(MOCK_ENV_VARIABLE);
                  }).to.throw(
                    ReferenceError,
                    `Environment variable ${MOCK_ENV_VARIABLE} is required`,
                  );
            });
        });

        describe('a default value is provided also', () => {
            it('returns the value', () => {
                const MOCK_ENV_VARIABLE = 'MOCK_ENV_VARIABLE';
                process.env[MOCK_ENV_VARIABLE] = '';
                const defaultValue = 'default';
                expect(getEnvVar(MOCK_ENV_VARIABLE, defaultValue)).to.equal(defaultValue);
            });
        })
    });
})