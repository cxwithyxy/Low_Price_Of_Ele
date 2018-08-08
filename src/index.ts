import Ele_Crawler = require("./Ele_Crawler");
import Config = require("./Config");
import Live_Commandline = require("./utils/Live_Commandline");
import sleep = require("sleep-promise");

(async () => {

    let ele_Crawler = new Ele_Crawler(
        Config.launch_Config(), 
        Config.UA_Config(),
        Config.STORE_LS_Config()
    );
    await ele_Crawler.init();
    await ele_Crawler.new_Page();
    // Live_Commandline.getInstance().set("page", await ele_Crawler.new_Page());
})();

Live_Commandline.getInstance().set("log", console.log);
Live_Commandline.getInstance().start(true);

