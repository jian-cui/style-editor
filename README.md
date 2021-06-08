# 可视化样式编辑器

## 用法

1. `commonjs`

   ```javascript
   import styleEditor from './style-editor.cjs';

   // 渲染DOM 传入父元素id
   styleEditor.render('root');

   // 第一次传入css
   setTimeout(function() {
     console.log('开始获取css.');
     styleEditor.postCSS(`
       .warning {
         border: 1px solid #ccc;
         padding: 10px;
         color: #333;
         font-size: 20px;
       }
     `)

   }, 2000);

   // 第二次传入css
   setTimeout(function() {
     console.log('再次开始获取css.');
     styleEditor.postCSS(`
       .warning {
         width: 10px;
       }
     `)

   }, 10000);

   // css修改后的回调
   styleEditor.onCSSChanged(function(res) {
     console.log('修改后的css: ', res);
   })
   ```


2. `umd`

   ```html
   <div id="root"></div>
   <script src="./style-editor.umd.js" />
   <script>
      var editor = styleEditor.styleEditor;
      // 渲染DOM 传入父元素id
      styleEditor.render('root');

      // 第一次传入css
      setTimeout(function() {
        console.log('开始获取css.');
        styleEditor.postCSS(`
          .warning {
            border: 1px solid #ccc;
            padding: 10px;
            color: #333;
            font-size: 20px;
          }
        `)

      }, 2000);

      // css修改后的回调
      styleEditor.onCSSChanged(function(res) {
        console.log('修改后的css: ', res);
      })
   <script>
   ```


> [Fabulous](https://github.com/Raathigesh/fabulous)