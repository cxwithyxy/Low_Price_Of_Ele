import Conf = require("Conf");
import Singleton = require("./base/Singleton");

class Config extends Singleton{
    
    private conf_Storage_Path: String;

    private config_Name = ".ele.conf";

    private error_Desc = {
        "SID": "请配置好 SID . SID 用于登录 ele"
    }

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
            configName: this.config_Name,
            cwd: this.conf_Storage_Path = process.cwd()
        });
    }

    get_Path_Warn_Desc()
    {
        return "确认目录 " + this.conf_Storage_Path + " 下存在 " + this.config_Name + ".json 文件. 而且这个 json 文件不要有多余的逗号"
    }

    get_Conf_Driver()
    {
        return this.conf_Driver;
    }

    get_Conf_Value(_key:String)
    {
        let return_V = this.get_Conf_Driver().get(_key);
        let error_Desc = this.error_Desc[_key as any];
        if( (typeof return_V == typeof undefined) && error_Desc ){
            throw this.get_Path_Warn_Desc() + "\n" + error_Desc;
        }
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
