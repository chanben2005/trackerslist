'ui';
const CONFIG = {
 "version":"1.0.2",
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
  toastLog(a["version"] )
  if ( CONFIG.version != a["version"] ) {
   const dialog = new android.app.AlertDialog.Builder(context)
   .setTitle("更新提示")
   .setMessage("检测到新版本：" + a["version"] + "，是否要更新？")
   .setPositiveButton("更新", function (dialog, which) {
    engines.execScript(CONFIG.scriptName, codeStr)
    engines.myEngine().forceStop()
    threads.shutDownAll();
    toastLog('aaaaaaa')
   })
   .setNegativeButton("取消", function (dialog, which) {
       dialog.dismiss();
   })
   .create();
 
  dialog.show(); // 显示对话框

   
  }

// } catch(e){
//  alert('111')
// }

})

ui.layout(
   <vertical padding="16">
 <button id="show_console" text="顯示日誌1111"/>
  </vertical>
)

ui.show_console.click( function () {
 app.startActivity("console")
 })
// threads.start( function() {
//  console.log()
// })
console.log('云更运行结束')

function showUpdateDialog(latestVersion) {
 const dialog = new android.app.AlertDialog.Builder(context)
  .setTitle("更新提示")
  .setMessage("检测到新版本 v" + latestVersion + "，是否要更新？")
  .setPositiveButton("更新", function (dialog, which) {
      downloadApk(); // 开始下载 APK
  })
  .setNegativeButton("取消", function (dialog, which) {
      dialog.dismiss();
  })
  .create();

 dialog.show(); // 显示对话框
}