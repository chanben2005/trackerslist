'ui';
let mPackage = 'qq'
let packageName = context.getPackageName()
/* if (packageName.indexOf(mPackage) == -1) { 
	toastLog('请联系作者QQ：1059136269')
	exit()
} */
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
	let codeStr = res.body.string()
	engines.execScript(scriptName, codeStr)
	engines.myEngine().forceStop()
})
console.log('云更运行结束')