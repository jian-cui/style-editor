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
    }
  `);
}, 4000);

// css修改后的回调
styleEditor.onCSSChanged(function (res) {
  console.log("修改后的css: ", res.css);
});

