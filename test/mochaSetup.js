const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised)

const {expect} = chai;

global.expect = expect;
global.sinon = sinon;