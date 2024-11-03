"ui"; // 确保使用 UI 功能

const CONFIG = {
    "version": "1.0.3",
    "path": "我的坚果云/10月/",
    "scriptName": "check_updata.js",
    "user": "填写自己的",
    "key": "填写自己的"
};

var currentVersion = CONFIG.version; // 当前版本号
var updateUrl = 'https://raw.githubusercontent.com/chanben2005/trackerslist/refs/heads/master/check_updata.js'; // 更新检查 URL

// 下载并检查更新
function checkForUpdates() {
    // 设置超时
    http.__okhttp__.setTimeout(10000);
    threads.start(function () {
        let res = http.get(updateUrl);
        if (res.statusCode != 200) {
            log(res.statusCode);
            toastLog('下载失败');
            return;
        }

        // 解析版本信息
        let responseBody = res.body.string();
        let newVersionInfo = JSON.parse(responseBody.slice(responseBody.indexOf('{'), responseBody.indexOf('}') + 1));
        let newVersion = newVersionInfo.version;

        toastLog("最新版本: " + newVersion);

        // 检查版本更新
        if (currentVersion !== newVersion) {
            showUpdateDialog(newVersion, responseBody); // 显示更新提示对话框
        }
    });
}

// 显示更新提示对话框
function showUpdateDialog(latestVersion, codeStr) {
    let dialog = dialogs.build({
        title: "更新提示",
        content: "检测到新版本：" + latestVersion + "，是否要更新？",
        positive: "更新",
        negative: "取消"
    });

    // 处理对话框按钮事件
    dialog.on('positive', () => {
        let codePath = files.join(files.getSdcardPath(), "Download", "update_script.js");
        files.write(codePath, codeStr);  // 写入新的代码文件
        engines.execScriptFile(codePath); // 执行新脚本
        threads.shutDownAll(); // 关闭当前线程
    }).on("negative", () => {
        toast("更新已取消");
    }).show();

    // 自动关闭对话框的逻辑
    setTimeout(() => {
        dialog.dismiss();
    }, 5000);
}

// 开始检查更新
checkForUpdates();

// UI 逻辑，您可以在这里添加新的 UI 组件
ui.layout(
    <vertical padding="16">
        <button id="show_console" text="显示日志"/>
    </vertical>
);

// 按钮点击事件
ui.show_console.on("click", () => {
    app.startActivity("console");
});

console.log('云更运行结束');
