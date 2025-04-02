//to print a report
function printReport(pages){
    console.log("==============");
    console.log("REPORT");
    console.log("==============");

    //call report first, that will then sort pages and print it!
    const sortedPages = sortPages(pages);
    
    for(const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];

        console.log(`Found ${hits} links to page: ${url}`);
    }

    console.log("==============");
    console.log("END REPORT");
    console.log("==============");
}

function sortPages(pages){
    const pagesArr = Object.entries(pages);

    //op => arr of arr (sorted based on second parameter!)
    pagesArr.sort((a,b)=>{
        return b[1]-a[1];
    });

    //return sorted arr!
    return pagesArr;
}

module.exports = {
    sortPages,
    printReport
}