import puppeteer = require("puppeteer");
import sleep = require("sleep-promise");

class Ele_Crawler{

    public launch_Config;
    public UA;
    public location_Config;

    public browser;

    constructor(launch_Config, UA, location_Config)
    {
        this.launch_Config = launch_Config;
        this.UA = UA;
        this.location_Config = location_Config;
    }

    async init()
    {
        this.browser = await puppeteer.launch(this.launch_Config);
        return this;
    }

    async new_Page()
    {
        let page = await this.browser.newPage();
        await page.setUserAgent(this.UA);
        return await this.set_Ele_Location(page);
    }

    async set_Ele_Location(page:any)
    {
        await page.goto('https://ele.me');
        await sleep(2000);
        await page.evaluate((STORE)=>{
            localStorage.setItem("STORE", STORE);
        }, this.location_Config);
        await page.goto('https://ele.me');
        
        await page.waitForFunction(() => {
            // 这里要检测真的地址加载出来才能继续往下跑
            // divs.forEach((el) => {
            //     if(el.innerText.indexOf("当前地址") != -1){
            //         return true;
            //     }
            // });
            return true;
        },);

        console.log("new page");
        return page;
    }

}

export = Ele_Crawler;