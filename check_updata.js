'ui';
// 软件内部储存路径
const PATH = context.getFilesDir().getAbsolutePath()
const CONFIG = {
 "version":"1.0.3",
 "path": "我的坚果云/10月/",
 "scriptName":"check_updata.js",
 "user": "填写自己的",
 "key": "填写自己的"
}
const CONFIG1 = '{"version":"1.0.1",}'
let mPackage = 'qq'
let packageName = context.getPackageName()
/* if (packageName.indexOf(mPackage) == -1) { 
	toastLog('请联系作者QQ：1059136269')
	exit()
} */
// try{
 http.__okhttp__.setTimeout(10000)
 threads.start(function () {
  let url ='https://raw.githubusercontent.com/chanben2005/trackerslist/refs/heads/master/check_updata.js'
  let res = http.get(url)
  // console.log(res)
  if (res.statusCode != 200) {
   log(res.statusCode)
   toastLog('下载失败')
   exit()
  }
  let codeStr = res.body.string()
  let a = JSON.parse(codeStr.slice(codeStr.indexOf('{'),codeStr.indexOf('}')+1))
	 toastLog('engines.myEngine()aaaaa:'+engines.myEngine())
  toastLog('PATH:'+PATH)
	 toastLog('version:'+a["version"] )
  toastLog('cwd:'+engines.myEngine().cwd())
	 toastLog('source:'+engines.myEngine().source)
  if ( CONFIG.version != a["version"] ) {
   var d = dialogs.build({
    title: "更新提示",
    content: "检测到新版本：" + a["version"] + "，是否要更新？",
    positive: "更新",
    negative: "取消"
   })
   .on('positive', () => {
    // threads.start(function () {
	    // engines.myEngine().cwd() + '/' +
	   
     codePath_1 =engines.myEngine().source;
	codePath_2 = PATH + '/check_updata.js';
	   codePath_3 =engines.myEngine().cwd()+'/check_updata.js';
     toastLog('codePath:'+codePath_1)
    //  toastLog(engines.myEngine().getSource())
     files.write(codePath_1,codeStr)
     //监听确定键
	    toastLog('aaa')
     engines.execScriptFile(codePath_1);
	    toastLog('bbb')
    // try{
    //  engines.myEngine().forceStop()
    // } catch(e){}
     
    // })
    threads.shutDownAll();
   })
   .on("dismiss", (dialog)=>{
    toast("对话框消失了");
   })
   .show();

    setTimeout(()=>{
        d.dismiss();
    }, 5000);
   
   
  }

// } catch(e){
//  alert('111')
// }

})

ui.layout(
   <vertical padding="16">
	<text text="{{CONFIG.version}}"/>
 <button id="show_console" text="顯示日誌222"/>
  </vertical>
)

ui.show_console.click( function () {
 app.startActivity("console")
 })
// threads.start( function() {
//  console.log()
// })
console.log('云更运行结束')
