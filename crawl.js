const { JSDOM } = require('jsdom');

async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`);

    try{
        const resp = await fetch(currentURL);

        //400-499 for client & 500-599 for server error!
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return;
        }

        //check for content type
        const contentType = resp.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType} on page: ${currentURL}`);
            return;
        }

        console.log(await resp.text()); //.text() method returns a promise! so handle it gracefully!
    }
    catch(err){
        console.log(`error fetching data: ${err.message} at ${currentURL}`);
    }
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
