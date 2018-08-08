import Conf = require("Conf");
import Singleton = require("./base/Singleton");

class Config extends Singleton{
    
    static instance : Config;

    public static getInstance() : Config
    {
        if(!this.instance)
        {
            this.instance = new Config();
        }
        return this.instance;
    }

    private conf_Driver: Conf;

    constructor()
    {
        super();
        this.conf_Driver = new Conf({
            configName: ".ele.conf",
            cwd: process.cwd()
        });
    }

    get_Conf_Driver()
    {
        return this.conf_Driver;
    }

    get_Conf_Value(_key:String)
    {
        let return_V = Config.getInstance().get_Conf_Driver().get(_key);
        return return_V;
    }

    static launch_Config()
    {
        return {
            executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
            devtools : true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    }

    static UA_Config()
    {
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    }

    static STORE_LS_Config()
    {
        return '{"userId":0,"location":{"geohash":"ws0eegnkxc87","latitude":23.132495,"longitude":113.376836,"timestamp":' + (new Date()).getTime() + ',"locationName":"乐天大厦(西北门)"},"cityId":4,"districtId":5623}';
    }

    static login_Cookie_Config():Object
    {
        return {
            name: "SID",
            value: Config.getInstance().get_Conf_Value("SID"),
            domain: ".ele.me",
            path: "/",
            httpOnly: true,
            expires:new Date().getTime() / 1000 + 365 * 24 * 3600};
    }
}
export = Config;
