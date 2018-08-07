import Singleton = require("../base/Singleton");

/**
 * Live_Commandline
 * 通过终端命令实时操作运行中的对象
 */

class Live_Commandline extends Singleton {
    
    static instance : Live_Commandline;

    public static getInstance() : Live_Commandline
    {
        if(!this.instance)
        {
            this.instance = new Live_Commandline();
        }
        return this.instance;
    }

    public typed_Word = "";
    public runtime_Object = {};

    constructor()
    {
        super();
        process.stdin.on('end', function() {
            process.stdout.write('end');
        });

        
    }

    set(key, runtime_Object)
    // set 设置一个object到运行环境中
    // key object名称
    // runtime_Object 对应的object
    {
        this.runtime_Object[key] = runtime_Object;
        return this;
    }

    start(mutiline = false)
    // start 启动, 会锁住进程
    {
        this.run(this.runtime_Object, mutiline);
        return this;
    }


    run(runtime_Object, mutiline=false)
    // runtime_Object 是一个对象，在命令行运行时，可对该对象进行操作。
    // mutiline 为true时, 启动多行模式, 遇到 > 后才会执行代码.
    {
        process.stdin.setEncoding('utf8');
        process.stdin.resume();
        process.stdin.on('data', function(chunk) {
            if(!mutiline){
                Live_Commandline.getInstance().runtime_In_Obj_JS_Code(runtime_Object, chunk);
            }else{
                if(chunk.substring(0,1) != ">"){
                    Live_Commandline.getInstance().typed_Word += chunk;
                }else{
                    Live_Commandline.getInstance().runtime_In_Obj_JS_Code(runtime_Object, Live_Commandline.getInstance().typed_Word);
                    Live_Commandline.getInstance().typed_Word = "";
                }
            }
        });
        console.log('Live_Commandline running');
    }

    runtime_In_Obj_JS_Code (inObj, funS)
    {
        return eval(
            "(function (){"+
                "return function (a){" +
                    "with(a){"+
                        "(async function (){" + 
                            funS +
                        "})();" + 
                    "}"+
                "}"+
            "})();"
        )(inObj);
    };
}

export = Live_Commandline;