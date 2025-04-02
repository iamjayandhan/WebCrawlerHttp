const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
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
    const input = 'http://blog.boot.dev/path/' //extra slash at the last
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})

//to get all urls and links present in a web page!
test('getURLsFromHTML absolute',()=>{
    const inputHTMLBody = 
        `<html>
            <body>
                <a href="https://blog.boot.dev/">
                    Boot.dev Blog
                </a>
            </body>
        </html>`

    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})

//to get all urls and links present in a web page!
//single link example!
test('getURLsFromHTML relative',()=>{
    const inputHTMLBody = 
        `<html>
            <body>
                <a href="/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>`

    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
})

//multiple links example
test('getURLsFromHTML relative',()=>{
    const inputHTMLBody = 
        `<html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog Path One
                </a>
                <a href="/path2/">
                    Boot.dev Blog Path Two
                </a>
            </body>
        </html>`

    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
})

//Invalid URLs
test('getURLsFromHTML relative',()=>{
    const inputHTMLBody = 
        `<html>
            <body>
                <a href="invalid">
                    Invalid URL
                </a>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog Path One
                </a>
                <a href="/path2/">
                    Boot.dev Blog Path Two
                </a>
            </body>
        </html>`

    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
})