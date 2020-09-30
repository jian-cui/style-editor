import { styleEditor } from "./style-editor";
// import {styleEditor} from '../dest/style-editor.cjs';

// 渲染DOM 传入父元素id
styleEditor.render("root");

// 第一次传入css
// setTimeout(function() {
//   console.log('开始获取css.');
//   styleEditor.postCSS(`
//     .warning {
//       border: 1px solid #ccc;
//       padding: 10px;
//       color: #333;
//       font-size: 20px;
//     }
//   `)
//
// }, 2000);

// 第二次传入css
setTimeout(function () {
  console.log("再次开始获取css.");
  styleEditor.postCSS(`
    .warning {
      width: 10px;
      padding: 10px;
      background-color: #FFF;
      background-image: url('http://storage.zone.photo.sina.com.cn/zone/1000_0/20200926/bb993e4fdc2c6a00e91936f88d3c4c89_6000_4000.jpg?&ssig=PMYOVmkSex&KID=sina,slidenews&Expires=1601378500');
      background-repeat: repeat;
      background-position: 10% 20%;
    }
  `);
}, 4000);

// css修改后的回调
styleEditor.onCSSChanged(function (res) {
  console.log("修改后的css: ", res.css);
});
