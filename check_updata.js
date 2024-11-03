"ui";
importClass(Packages.androidx.core.app.ActivityOptionsCompat);
importClass(Packages.android.content.Intent);
importClass(Packages.android.widget.Toast);
importClass(Packages.android.os.Environment);
importClass(Packages.java.io.File);

// 配置
const CONFIG = {
    "version": "1.0.3",
    "path": "我的坚果云/10月/",
    "scriptName": "check_updata.js",
    "user": "填写自己的",
    "key": "填写自己的"
};

const API_URL = 'https://raw.githubusercontent.com/chanben2005/trackerslist/refs/heads/master/check_updata.js';

checkForUpdates();  // 开始检查更新

function checkForUpdates() {
    // 设置超时
    http.__okhttp__.setTimeout(10000);

    // 使用线程检查更新
    threads.start(function () {
        let res = http.get(API_URL);
        
        // 检查 HTTP 响应
        if (res.statusCode !== 200) {
            log(res.statusCode);
            toastLog('下载失败');
            return;
        }

        // 解析 JSON 数据
        let codeStr = res.body.string();
        let updateInfo = JSON.parse(codeStr.slice(codeStr.indexOf('{'), codeStr.indexOf('}') + 1));
        
        toastLog("最新版本: " + updateInfo.version);
        
        // 检查版本
        if (CONFIG.version !== updateInfo.version) {
            showUpdateDialog(updateInfo.version, codeStr);
        } else {
            toast("当前已是最新版本");
        }
    });
}

// 显示更新对话框的函数
function showUpdateDialog(latestVersion, codeStr) {
    var d = dialogs.build({
        title: "更新提示",
        content: "检测到新版本：" + latestVersion + "，是否要更新？",
        positive: "更新",
        negative: "取消"
    })
    .on('positive', () => {
        downloadAndUpdate(codeStr); // 开始下载和更新
    })
    .on("dismiss", (dialog) => {
        toast("对话框已关闭");
    })
    .show();
}

// 下载并更新的逻辑
function downloadAndUpdate(codeStr) {
    let codePath = files.join(Environment.getExternalStorageDirectory(), "Download", "updated_script.js");
    
    // 保存下载的脚本
    files.write(codePath, codeStr);
    
    // 使用新的脚本
    engines.execScriptFile(codePath); // 执行新脚本

    // 强制停止当前脚本
    engines.myEngine().forceStop(); // 结束当前脚本
}

// UI 布局示例（可选）
ui.layout(
    <vertical padding="16">
        <button id="show_console" text="显示日志"/>
    </vertical>
);

// 按钮点击事件
ui.show_console.on("click", () => {
    app.startActivity("console");
});

console.log('云更新运行结束');
