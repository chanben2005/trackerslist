'ui';
let mPackage = 'qq'
let packageName = context.getPackageName()
/* if (packageName.indexOf(mPackage) == -1) { 
	toastLog('请联系作者QQ：1059136269')
	exit()
} */
http.__okhttp__.setTimeout(10000)
threads.start(function () {
	let url ='https://uc12b0bc04e0abff44705f90d06c.previews.dropboxusercontent.com/p/orig/ACdZq5yY9fc-j16b4QTbJhgILkcYH1zshmb-A16PabynVYXI4sBsN6k55tXccJTGdyRXYV73Kht63f9R6ha21MDmu7-rZICbw2rgnodgpZP2xi5vLRomhfAkNB5TViRAjZu8P3nyoutoTA1YYmKj4D1lvNiRF8rGXyETC3-Mz-qHJWNHkxt0Md7SKZcxa3AKsZSVPfb6JJmbZui2rIJ6J9E9lEicc1yyxToVnq4-EUmcol7pGghJzVqTlFNGN_B0APJApAwyh1eDq7nA3GRqMbebrZwKVyQzSN4uptp5UQeTvG-Symq59_8cMDYadrDGmpGQyx4h5DjP13FDHPSPWSkDQJy83A5SIhQiZ3SpFarodA/p.js'
	let res = http.get(url)
 console.assert.log(res)
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