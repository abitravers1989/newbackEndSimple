const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const { expect } = chai;
chai.use(require('sinon-chai'));

const articlesSchemaModel = require('./articles');

describe('articlesSchemaModel', () => {
    const dependencies = {
        mongoose,
    }
    describe.only('articlesSchema', () => {
        it('contains all the expect fields', () => {
            const expectedField = ['id', 'title', 'body', 'author', 'timestamp'];

            expect(articlesSchemaModel(dependencies).ArticlesSchema).to.have.all.keys(expectedField)
            //console.log(articlesSchemaModel.ArticlesSchema);
        });
        it('is a model object', () => {
            const { model } = mongoose
            const expectedField = ['id', 'title', 'body', 'author', 'timestamp'];

            expect(articlesSchemaModel(dependencies)).to.be.an.instanceOf(model)
            //console.log(articlesSchemaModel.ArticlesSchema);
        })
    })
})