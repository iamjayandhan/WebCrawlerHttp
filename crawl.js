const { JSDOM } = require('jsdom');

//here:
//baseURL -> entry point (Like a home page for the website)
//currentURL -> current crawling page
//pages -> object that holds all the crawled pages so far

//must to check if currentURL and baseURL are from the same domain!
async function crawlPage(baseURL,currentURL,pages){
    console.log(`actively crawling: ${currentURL}`);

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    //handle external links!
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }

    //check if the page is already crawled!
    //how many times same link is crawled! we take a count for providing a report
    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0 ){

        //if already crawled, then only increment that map count!
        //no need to crawl again! immediately return!
        pages[normalizedCurrentURL]++;
        return pages;
    }

    //we are going to crawl for the first time!
    pages[normalizedCurrentURL] = 1;

    try{
        //try to get the html page for parsing! (CurrentURL's Page -> HTML version)
        const resp = await fetch(currentURL);

        //400-499 for client & 500-599 for server error!
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return pages;
        }

        //check for content type
        const contentType = resp.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType} on page: ${currentURL}`);
            return pages;
        }

        // console.log(await resp.text()); //.text() method returns a promise! so handle it gracefully!
        const htmlBody = await resp.text();

        //this nextURLs contains all the links present in that currentURL's htmlBody!
        const nextURLs = getURLsFromHTML(htmlBody,baseURL);

        //recursively iterate over all the urls present in the currentURL's htmlBody! (nextURLs)
        for(const nextURL of nextURLs){
            //recursively call the same function!
            //based on urls, it will refine that pages map!
            //if new, creates entry, if already visited, then count is incremented! 
            pages = await crawlPage(baseURL,nextURL, pages);
        }
    }
    catch(err){
        console.log(`error fetching data: ${err.message} at ${currentURL}`);
    }

    return pages;
}

//input -> html page
//return all a tag links as output
function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    for(const linkElement of linkElements){
        try{
            let urlObj;

            if(linkElement.href.startsWith('/')){
                //for relative path
                urlObj = new URL(linkElement.href,baseURL);
            }
            else{
                //for absolute path
                urlObj = new URL(linkElement.href);
            }

            urls.push(urlObj.href);
        }
        catch(err){
            console.log(`Error Processing URL: ${err.message}`);
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1) //everything expect last char!
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}


// for(const linkElement of linkElements){
//     if(linkElement.href[0] === '/'){
//         //so this is a relative path!
//         //console.log(baseURL+linkElement.href.slice(1));
        
//         // urls.push(baseURL+linkElement.href.slice(1));
//         try{
//             const urlObj = new URL(`${baseURL}${linkElement.href.slice(1)}`);
//             urls.push(urlObj.href);
//         }catch(err){
//             console.log(`error with ref relative url: ${err.message}`)
//         }
//     }
//     else if(linkElement.href.slice(0,1) === 'h'){
//         //so this is a absolute path!
//         //console.log(linkElement.href);
//         // urls.push(linkElement.href);
//         try{
//             const urlObj = new URL(`${linkElement.href}`);
//             urls.push(urlObj.href);
//         }catch(err){
//             console.log(`error with relative url: ${err.message}`);
//         }
//     }
//     else{
//         //this is invalid path!
//         //so we ignore!
//         console.log("Invalid URL ignored: "+linkElement.href);
//     }
// }
