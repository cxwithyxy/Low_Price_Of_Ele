import puppeteer = require("puppeteer");
import sleep = require("sleep-promise");

class Ele_Crawler{

    public launch_Config:Object;
    public UA:String;
    public location_Config:String;
    public cookies:Array<Object>;

    public browser;

    constructor(launch_Config, UA, location_Config, cookies)
    {
        this.launch_Config = launch_Config;
        this.UA = UA;
        this.location_Config = location_Config;
        this.cookies = cookies;
    }

    async init()
    {
        this.browser = await puppeteer.launch(this.launch_Config);
        return this;
    }

    async new_Page()
    {
        let page = await this.browser.newPage();
        await page.setCookie(...this.cookies);

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
            let all_Div = document.getElementsByTagName("div");
            let all_Div_Length = all_Div.length;
            for(let i = 0; i < all_Div_Length; i++){
                let el = all_Div[i];
                let attr = el.getAttribute("aria-label");
                if(    attr
                    && attr.indexOf("当前地址") != -1
                    && attr.indexOf("正在定位") == -1
                    && attr.indexOf("未知地址") == -1 ){
                    return true;
                }

            }
            return false;
        });
        return page;
    }

}

export = Ele_Crawler;