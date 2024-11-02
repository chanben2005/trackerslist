'ui';
const CONFIG = {
 "version":"1.0.1",
 "path": "我的坚果云/10月/",
 "scriptName":"check_updata.js",
 "user": "填写自己的",
 "key": "填写自己的"
}

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
  console.log(res)
  if (res.statusCode != 200) {
   log(res.statusCode)
   toastLog('下载失败')
   exit()
  }
  let codeStr = res.body.json()
  toastLog(codeStr.CONFIG )
  // if ( CONFIG.version != codeStr )
  engines.execScript(CONFIG.scriptName, codeStr)
  engines.myEngine().forceStop()
// } catch(e){
//  alert('111')
// }

})

ui.layout(
   <vertical padding="16">
 <button id="show_console" text="顯示日誌"/>
  </vertical>
)

ui.show_console.click( function () {
 app.startActivity("console")
 })
// threads.start( function() {
//  console.log()
// })
console.log('云更运行结束')