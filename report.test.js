const { sortPages } = require('./report.js');
const {test, expect} = require('@jest/globals');

//test suites!
test('sortPages 5 pages!',()=>{
    const input = {
        'http://jdfolio.vercel.app/path':1,
        'http://jdfolio.vercel.app/':3,
        'http://jdfolio.vercel.app/path2':2,
        'http://jdfolio.vercel.app/path3':7,
        'http://jdfolio.vercel.app/path4':4
    }
    const actual = sortPages(input);
    const expected = [
        ['http://jdfolio.vercel.app/path3',7],
        ['http://jdfolio.vercel.app/path4',4],
        ['http://jdfolio.vercel.app/',3],
        ['http://jdfolio.vercel.app/path2',2],
        ['http://jdfolio.vercel.app/path',1]
    ]
    expect(actual).toEqual(expected);
})