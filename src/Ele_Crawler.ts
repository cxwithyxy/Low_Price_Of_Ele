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
        var page = await this.browser.newPage();
        page.setUserAgent(this.UA);
        return this.set_Ele_Location(page);
    }

    async set_Ele_Location(page:any)
    {
        await page.goto('https://ele.me');
        await sleep(2000);
        await page.evaluate((STORE)=>{
            localStorage.setItem("STORE", STORE);
        }, this.location_Config);
        await page.goto('https://ele.me');
        await sleep(2000);
        return page;
    }

}

export = Ele_Crawler;