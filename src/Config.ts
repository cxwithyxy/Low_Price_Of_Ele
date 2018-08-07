class Config {
    
    static launch_Config()
    {
        return {
            executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
            devtools : true
        }
    }

    static UA_Config()
    {
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
    }

    static STORE_LS_Config()
    {
        return '{"userId":0,"location":{"geohash":"ws0eegnkxc87","latitude":23.132495,"longitude":113.376836,"timestamp":1533633899,"locationName":"乐天大厦(西北门)"},"cityId":4,"districtId":5623}';
    }
}
export = Config;
