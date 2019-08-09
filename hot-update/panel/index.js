// panel/index.js, this filename needs to match the one registered in package.json
var Fs = require('fs');
let Path = require('path');
const fsextra = require("fs-extra");
let cp = require('child_process');

Editor.Panel.extend({
    // css style for panel
    //   style: `
    //   :host { margin: 5px; }
    //   h2 { color: #f90; }
    // `,

    //   // html template for panel
    //   template: `
    //   <h2>foobar</h2>
    //   <hr />
    //   <div>State: <span id="label">--</span></div>
    //   <hr />
    //   <ui-button id="btn">Send To Main</ui-button>
    // `,
    style: Fs.readFileSync(Editor.url('packages://hot-update/panel/index.css', 'utf8')),

    // html template for panel
    template: Fs.readFileSync(Editor.url('packages://hot-update/panel/index1.html', 'utf8')),
    // element and variable binding

    // method executed when template and styles are successfully loaded and initialized
    // $: {
    //     logTextArea: '#logTextArea',
    // },
    ready() {
        // let logCtrl = this.$logTextArea;
        // let logListScrollToBottom = function() {
        //     setTimeout(function() {
        //         logCtrl.scrollTop = logCtrl.scrollHeight;
        //     }, 10);
        // };
        this.vm = new Vue({
            el: this.shadowRoot,
            data: {
                msg: 12314,
                remoteUrl: 'http://120.0.0.1:8080/',
                v: '1.0',
                logMsg: "",
            },
            methods: {
                onChange: function() {
                    this.addLog("点击");
                },
                getAllAssets() {
                    // let adb = Editor.assetdb;
                    if (fsextra.existsSync(Path.join(Editor.Project.path, 'myNewFolder'))) {
                        this.addLog("myNewFolder Already exist")
                    } else {
                        fsextra.mkdirSync(Path.join(Editor.Project.path, 'myNewFolder'));
                        this.addLog('New folder created!');
                    }
                },
                hotUpdate() {
                    let _path = Editor.Project.path;
                    let cmd = Path.join(_path, 'packages', 'hot-update', 'hotUpdate.cmd');
                    let srcPath = Path.join(_path, 'packages', 'hot-update');
                    this.addLog(_path + cmd + srcPath);

                    cp.exec(`start ${cmd} ${this.v} ${this.remoteUrl} ${srcPath} ${_path}`);
                    // cp.exec(`start ${Path.join(Editor.Project.path, 'hotUpdate.cmd')} ${this.v},${this.remoteUrl}`);
                    // cp.exec('D:', (err, stdout, stderr) => {
                    //     if (err) {
                    //         console.error(err);
                    //         return;
                    //     }
                    //     console.log(stdout);
                    // });

                    // 文件名中包含空格的脚本：
                    // const bat = spawn('./hotUpdate', ['a', 'b'], { shell: true });
                    // 或：
                    // exec('"my script.cmd" a b', (err, stdout, stderr) => {
                    //     // ...
                    // });
                },
                addLog(msg) {
                    this.logMsg += `[${new Date().toLocaleString()}]` + msg + '\n';
                    logListScrollToBottom();
                },
            }
        })

        Editor.log(this.vm.msg);
        // this.$btn.addEventListener('confirm', () => {
        //     Editor.Ipc.sendToMain('foobar:clicked');
        // });
    },

    // register your ipc messages here
    messages: {
        'foobar:hello' (event) {
            this.vm.msg = "66666666";
        }
    }
});