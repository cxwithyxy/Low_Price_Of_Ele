import puppeteer = require("puppeteer");
import Config = require("./Config");
import Live_Commandline = require("./utils/Live_Commandline");
import sleep = require("sleep-promise");

var main_Object = {
    log: console.log
};

(async () => {
    var page, browser, frame;
    main_Object["Config"] = Config;
    main_Object["browser"] = browser = await puppeteer.launch(Config.launch_Config());
    main_Object["page"] = page = await browser.newPage();
    page.setUserAgent(Config.UA_Config());
    await page.goto('https://ele.me');
    await sleep(2000);
    await page.evaluate((STORE)=>{
        localStorage.setItem("STORE", STORE);
    }, Config.STORE_LS_Config());
    await page.goto('https://ele.me');
    await sleep(2000);
    // await page.$eval('header > div > div', el => el.click());
    // await page.$$eval('.wrapper span', (els) => {
    //     els.map((el) => {
    //         if(el.innerText.indexOf("选择城市") != -1){
    //             el.click();
    //         }
    //     });
    //     console.log(els.length);
    // });
    // await sleep(2000);
    // var search_Input = await page.$('input');
    // await search_Input.press("Enter");
    // await search_Input.type("广州市",{delay: 300});

})();

Live_Commandline.getInstance().run(main_Object, true);
