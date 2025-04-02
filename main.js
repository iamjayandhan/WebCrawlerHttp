const { crawlPage } = require('./crawl.js');

function main(){
    if(process.argv.length < 3){
        console.log(`No Website provided`);
        process.exit(1);
    }

    if(process.argv.length > 3){
        console.log(`Too many command line args`);
        process.exit(1);
    }

    const baseURL = process.argv[2]; //that user's url input!

    //check what is inside that argv
    // for(const arg of process.argv){
    //     console.log(arg); //C:\nvm4w\nodejs\node.exe, D:\Projects\WebCrawlerHttp\main.js, http://example.com
    // }
    console.log(`Starting crawl of ${baseURL}`);
    crawlPage(baseURL);
}

main()