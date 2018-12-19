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
    describe('articlesSchema', () => {
        it('contains all the expect fields', () => {
            const expectedField = ['id', 'title', 'body', 'author', 'timestamp'];

            const body = 'A post on how to TDD an express app with dependency injection and a mongo DB';
            let articleInsance = new articlesSchemaModel({ title: 'Create an Express add with mongoDB', body, author: 'abi'})

            expect(articleInsance).to.have.all.keys(expectedField)
            //console.log(articlesSchemaModel.ArticlesSchema);
        });
        it('is a model object', () => {
            const { model } = mongoose
            const expectedField = ['id', 'title', 'body', 'author', 'timestamp'];

            //expect(articlesSchemaModel(dependencies)).to.be.an.instanceOf(model)
            //console.log(articlesSchemaModel.ArticlesSchema);
        })
    })
})

// { title: 'Create an Express add with mongoDB', body: 'A post on how to TDD an express app with dependency injection and a mongo DB', author: 'abi'}