[中文](./README.en.md) | ENGLISH

# iu-toast

The native js toast plug-in does not depend on any libraries.



##  Installation & Use

- Introduction Method 1:

```
<link rel="stylesheet" href="iu-toast.min.css">
<script src="iu-toast.min.js"></script>
```



- Introduction Method 2:

```
npm install iu-toast
```

```
import 'iu-toast/dist/iu-toast.min.css'
import iToast from 'iu-toast';
```



- Use

```
iToast('提示内容')
// 成功提示
iToast.success()
// 失败提示
iToast.fail()
// 加载提示
iToast.loading()
```



##  API

| Method                 | Description                                                  | Parameter            | Return value   |
| ---------------------- | ------------------------------------------------------------ | -------------------- | -------------- |
| iToast                 | Display tips                                                 | `options or message` | toast instance |
| iToast.loading         | Show loading tips                                            | `options or message` | toast instance |
| iToast.success         | Prompt for successful display                                | `options or message` | toast instance |
| iToast.fail            | Display failure prompt                                       | `options or message` | toast instance |
| iToast.clear           | Clear prompt                                                 | -                    | `void`         |
| iToast.allowMultiToast | Allow multiple Toast at the same time                        | -                    | `void`         |
| iToast.setConfig       | Modify the default configuration for all Toast. You can specify the default configuration for a specified item by specifying the type. | `options or type`    | `void`         |
| iToast.resetConfig     | Reset the default configuration, which takes effect for all Toast. You can reset the default configuration of a specified item by specifying the type. | `type`               | `void`         |



##  Options

| Parameter | Description                                                  | Type     | Default value |
| --------- | ------------------------------------------------------------ | -------- | ------------- |
| Type      | The type of the prompt. Valid values: `loading` `success` `fail` `text` | string   | `text`        |
| Position  | The location of the display. Valid values: `top` `bottom`    | string   | `middle`      |
| Message   | Text content                                                 | string   | `''`          |
| overlay   | Do you want to disable background clicks?                    | boolean  | `false`       |
| overlay   | Whether the mask layer is displayed                          | boolean  | `false`       |
| Duration  | The display duration (ms). When the value is 0, toast does not disappear. | Number   | `2000`        |
| onOpened  | Callback function after full display                         | Function | -             |
| onClose   | Callback function when closed                                | Function | -             |

PS: when using `loading api` , `success api` , `fail api` When `type` The configuration item is invalid, `success api` , `fail api` Force `overlay` For `true`