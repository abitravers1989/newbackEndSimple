const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const getEnvVar = require('./getEnvVar');

describe('getEnvVar', () => {
    describe.only('when the requested env variable is found', () => {
        it('returns the value', () => {
            const MOCK_ENV_VARIABLE = 'MOCK_ENV_VARIABLE';
            const mockVariableValue = 'test';
            process.env[MOCK_ENV_VARIABLE] = mockVariableValue;
            expect(getEnvVar('MOCK_ENV_VARIABLE')).to.equal(mockVariableValue)
        });
    });
})