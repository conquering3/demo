const sum = require('./sum'),
    expect = require('chai').expect;

describe('计算和', () => {
    it('1,2,3的和等于6', () => {
        expect(sum(1,2,3)).to.be.equal(6);
    });
});