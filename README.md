# iu-toast
原生js的toast插件，不依赖任何库。



## 使用
- 引入 js 和 css
```html
<link rel="stylesheet" href="iu-toast.min.css">
<script src="iu-toast.min.js"></script>
```

```javascript
iToast('提示内容')
// 成功提示
iToast.success()
// 失败提示
iToast.fail()
// 加载提示
iToast.loading()
```



## API

| 方法名        | 说明         | 参数                | 返回值 |
| ------------- | ------------ | ------------------- | ------ |
| iToast         | 展示提示     | `options or message` | `void` |
| iToast.loading | 展示加载提示 | `options or message` | `void` |
| iToast.success | 展示成功提示 | `options or message` | `void` |
| iToast.fail    | 展示失败提示 | `options or message` | `void` |
| iToast.clear   | 清除提示     | -                   | `void` |



## Options

| 参数     | 说明                                                | 类型     | 默认值   |
| -------- | --------------------------------------------------- | -------- | -------- |
| type     | 提示类型，可选值为`loading` `success` `fail` `text` | string   | `text`   |
| position | 展示的位置，可选值为 `top` `bottom`                 | string   | `middle` |
| message  | 文本内容                                            | string   | `''`     |
| overlay  | 是否禁止背景点击                                    | boolean  | `false`  |
| overlay  | 是否显示遮罩层                                      | boolean  | `false`  |
| duration | 展示时长(ms)，值为0时，toast不会消失                | number   | `2000`   |
| onOpened | 完全展示后的回调函数                                | Function | -        |
| onClose  | 关闭时的回调函数                                    | Function | -        |

PS：当使用  `loading api` 、`success api` 、`fail api`  时 `type` 配置项会设置无效，`success api` 、`fail api` 会强制 `overlay` 为 `true`

