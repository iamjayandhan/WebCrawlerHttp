const { crawlPage } = require('./crawl.js');

async function main(){
    if(process.argv.length < 3){ //check command line args! 
        //by default, 2 args will be there, check if 3rd(user's website link) is present!
        console.log(`No Website provided`);
        process.exit(1);
    }

    if(process.argv.length > 3){
        //check if more than one website link is given!
        console.log(`Too many command line args`);
        process.exit(1);
    }

    const baseURL = process.argv[2]; //that user's url input!

    //check what is inside that argv
    // for(const arg of process.argv){
    //     console.log(arg); //C:\nvm4w\nodejs\node.exe, D:\Projects\WebCrawlerHttp\main.js, http://example.com
    // }
    console.log(`Starting crawl of ${baseURL}`);

    //baseURL, currentURL, pages object!
    const pages = await crawlPage(baseURL,baseURL, {});

    for(const page of Object.entries(pages)){
        console.log(page);
    }
}

main()