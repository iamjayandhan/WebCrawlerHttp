const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

//test suites!
test('normalizeURL strip protocol',()=>{
    const input = 'https://blog.boot.dev/path' //normal
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/' //extra slash at the last
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

//this test suite pass because of URL constructor!
//internally it convert
test('normalizeURL capitals',()=>{
    const input = 'https://BLOG.boot.dev/path/' //extra slash at the last
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

//strip http
test('normalizeURL strip http',()=>{
    const input = 'https://blog.boot.dev/path/' //extra slash at the last
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})