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

    constructor()
    {
        super();
        process.stdin.on('end', function() {
            process.stdout.write('end');
        });

        
    }


    run(runtime_Object)
    // runtime_Object 是一个对象，在命令行运行时，可对该对象进行操作。
    {
        process.stdin.setEncoding('utf8');
        process.stdin.resume();
        process.stdin.on('data', function(chunk) {
            Live_Commandline.getInstance().runtime_In_Obj_JS_Code(runtime_Object, chunk);
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