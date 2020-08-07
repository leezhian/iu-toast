import { ClassName, config } from './config'

/**
 * 校验器
 * @type {{isHasAttr(*=, *=): *, isObject(*=): *, isFunction(*=): boolean, isSameType(*=, *=): boolean, isString(*=): boolean}}
 */
const validators = {
  isString (str) {
    return typeof str === 'string'
  },
  isObject (obj) {
    return typeof obj === 'object' && !Array.isArray(obj)
  },
  isFunction (fn) {
    return typeof fn === 'function'
  },
  isSameType (value, value2) {
    if (typeof value !== typeof value2) {
      return false
    }
    if (this.isObject(value) !== this.isObject(value2)) {
      return false
    }
    return true
  },
  isHasAttr (obj, key) {
    return Object.keys(obj).includes(key)
  }
}

// 根据不同type干不同操作
const doType = {
  'text': function (toast) {
    if (toast.loadingDOM) {
      toast.toastDOM.removeChild(toast.loadingDOM)
      toast.loadingDOM = null
    }
    if (toast.iconDOM) {
      toast.toastDOM.removeChild(toast.iconDOM)
      toast.iconDOM = null
    }
    toast.toastDOM.classList.add(ClassName.TOAST_TEXTBOX)
  },
  'loading': function (toast) {
    if (toast.loadingDOM) {
      return
    }
    if (toast.iconDOM) {
      toast.toastDOM.removeChild(toast.iconDOM)
      toast.iconDOM = null
    }
    toast.loading();
  },
  'success': function (toast) {
    if (toast.iconDOM) {
      toast.iconDOM.className = `${ClassName.TOAST_ICON} ${ClassName.TOAST_ICON_SUCCESS}`
      return
    }
    if (toast.loadingDOM) {
      toast.toastDOM.removeChild(toast.loadingDOM)
      toast.loadingDOM = null
    }
    toast.createIcon(ClassName.TOAST_ICON_SUCCESS);
  },
  'fail': function (toast) {
    if (toast.iconDOM) {
      toast.iconDOM.className = `${ClassName.TOAST_ICON} ${ClassName.TOAST_ICON_FAIL}`
      return
    }
    if (toast.loadingDOM) {
      toast.toastDOM.removeChild(toast.loadingDOM)
      toast.loadingDOM = null
    }
    toast.createIcon(ClassName.TOAST_ICON_FAIL);
  }
}

// 设置位置
const setPosition = {
  'middle': function () {
    return ClassName.TOAST_MIDDLE
  },
  'top': function () {
    return ClassName.TOAST_TOP
  },
  'bottom': function () {
    return ClassName.TOAST_BOTTOM
  }
}

// 创建toast
class CreateToast {
  constructor () {
    this.toastDOM = null; // iuToast DOM
    this.textDOM = null; // text DOM
    this.loadingDOM = null; // loading DOM
    this.iconDOM = null; // icon DOM

    this.init();
  }

  // 初始化
  init () {
    this.toastDOM = this.createBox();
    this.textDOM = this.createText();

    this.toastDOM.append(this.textDOM);
    document.body.append(this.toastDOM);
  }

  // 创建容器
  createBox () {
    const toastBox = document.createElement('div');
    toastBox.className = `${ClassName.TOAST_BOX} ${ClassName.TOAST_ANIMATION_IN}`;
    toastBox.style.display = 'none';
    return toastBox
  }

  // 创建icon
  createIcon (typeClass) {
    this.iconDOM = document.createElement('i');
    this.iconDOM.className = `${ClassName.TOAST_ICON} ${typeClass}`;
    this.toastDOM.insertBefore(this.iconDOM, this.toastDOM.childNodes[0]);
  }

  // 创建文本容器
  createText () {
    const textBox = document.createElement('div');
    textBox.className = ClassName.TOAST_TEXTBOX;
    return textBox
  }

  loading () {
    this.loadingDOM = document.createElement('div');
    this.loadingDOM.className = ClassName.TOAST_LOADING;
    this.loadingDOM.innerHTML = `<span class="iu-loading_spinner">
      <svg viewBox="25 25 50 50" class="iu-loading_circular">
      <circle cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </span>`
    this.toastDOM.insertBefore(this.loadingDOM, this.toastDOM.childNodes[0]);
  }

  /**
   * 设置文本容器文本
   * @param text {string}
   */
  text (text) {
    this.textDOM.innerText = text;
  }

  /**
   * 是否显示遮罩层
   * @param isShow
   */
  showOverlay (isShow) {
    if (isShow) {
      document.body.classList.add(ClassName.TOAST_OVERLAY)
    } else {
      document.body.classList.remove(ClassName.TOAST_OVERLAY)
    }
  }

  // 控制toast显示
  show () {
    this.toastDOM.style.display = ''
  }

  // 控制toast隐藏
  hide () {
    this.toastDOM.style.display = 'none'
  }

  // 移除toast DOM
  remove () {
    document.body.removeChild(this.toastDOM)
  }
}

let singleToast;
let allowMulti = false;
let defaultConfig = config

const iToast = (function () {
  let timer;
  /**
   * 提示
   * @param opt {string|object} 消息或配置对象
   */
  return function (opt) {
    let toast; // 保存toast实例
    // 如果允许多个toast时，无需清除定时器
    if (!allowMulti) {
      clearTimeout(timer)
      toast = singleToast
    }
    // 合并配置
    let temp;
    if (validators.isString(opt)) {
      temp = { message: opt }
    } else if (validators.isObject(opt)) {
      temp = opt
    } else {
      throw new Error('params is string or object');
    }
    const config = Object.assign({}, defaultConfig, temp);

    if (!singleToast || allowMulti) {
      toast = new CreateToast()
      if (!allowMulti) {
        singleToast = toast
      }
    }

    // 重置class
    toast.toastDOM.className = ClassName.TOAST_BOX
    // 添加过渡动画
    if (!timer) {
      toast.toastDOM.classList.add(ClassName.TOAST_ANIMATION_IN)
    }
    // 设置位置
    toast.toastDOM.classList.add(setPosition[config.position]() || '')
    // 设置是否可点
    config.forbidClick && document.body.classList.add(ClassName.TOAST_UNCLICKABLE)
    // 设置遮罩层
    config.overlay && toast.showOverlay(true)
    // 不同type的操作不同
    doType[config.type] && doType[config.type](toast);
    // 修改文本
    toast.text(config.message);
    // 显示toast
    toast.show()
    // 过渡动画
    if (!timer) {
      setTimeout(function () {
        toast.toastDOM.classList.remove(ClassName.TOAST_ANIMATION_IN)
      }, 1)
    }
    // 打开后回调
    config.onOpened && config.onOpened()

    if (config.duration === 0) return

    timer = setTimeout(function () {
      // 过渡动画
      toast.toastDOM.classList.add(ClassName.TOAST_ANIMATION_OUT)
      setTimeout(function () {
        timer = null
        // 过渡动画
        toast.toastDOM.classList.remove(ClassName.TOAST_ANIMATION_OUT)
        config.forbidClick && document.body.classList.remove('iu-toast_unclickable')
        config.overlay && toast.showOverlay(false)
        // 如果是运行多个toast，则是移除，单例是隐藏
        if (allowMulti) {
          toast.remove()
        } else {
          toast.hide()
        }
        config.onClose && config.onClose()
      }, 200)
    }, config.duration)
    // 返回实例
    return toast
  }
})()

/**
 * 加载提示
 * @param opt {string|object} 消息或配置对象
 */
iToast.loading = function (opt) {
  let temp
  opt = opt || { message: '加载中...', type: 'loading', forbidClick: true }
  if (validators.isString(opt)) {
    temp = { message: opt, type: 'loading', forbidClick: true }
  } else if (validators.isObject(opt)) {
    temp = Object.assign({}, opt, { type: 'loading', forbidClick: true });
  } else {
    throw new Error('params is string or object');
  }
  iToast(temp)
}

/**
 * 成功提示
 * @param opt {string|object} 消息或配置对象
 */
iToast.success = function (opt) {
  let temp
  opt = opt || { message: '成功', type: 'success' }
  if (validators.isString(opt)) {
    temp = { message: opt, type: 'success' }
  } else if (validators.isObject(opt)) {
    temp = Object.assign({}, opt, { type: 'success' });
  } else {
    throw new Error('params is string or object');
  }
  iToast(temp)
}

/**
 * 错误提示
 * @param opt {string|object} 消息或配置对象
 */
iToast.fail = function (opt) {
  let temp
  opt = opt || { message: '失败', type: 'fail' }
  if (validators.isString(opt)) {
    temp = { message: opt, type: 'fail' }
  } else if (validators.isObject(opt)) {
    temp = Object.assign({}, opt, { type: 'fail' });
  } else {
    throw new Error('params is string or object');
  }
  iToast(temp)
}

/**
 * 清除toast
 */
iToast.clear = function () {
  document.body.classList.remove(ClassName.TOAST_UNCLICKABLE)
  singleToast.showOverlay(false)

  if (allowMulti) {
    const toastList = document.getElementsByClassName(ClassName.TOAST_BOX)
    if (!toastList.length) {
      return
    }
    for (let index = toastList.length - 1; index >= 0; index--) {
      console.log(index)
      document.body.removeChild(toastList[index])
    }
    return
  }
  singleToast.hide()
}

/**
 * 允许多个toast
 */
iToast.allowMultiToast = function () {
  allowMulti = true
}

/**
 * 设置配置
 * @param type {string|object}
 * @param value
 */
iToast.setConfig = function (type, value) {
  if (!type || (!validators.isString(type) && !validators.isObject(type))) {
    throw new Error('function setConfig must have arguments, which can be either a String or an Object')
  }
  if (validators.isObject(type)) {
    defaultConfig = Object.assign({}, defaultConfig, type)
  }
  if (validators.isString(type)) {
    if (!value) {
      throw new Error('When the first argument is of type String, the second argument must be passed')
    }
    validators.isHasAttr(defaultConfig, type) && (validators.isSameType(defaultConfig[type], value) || (['onOpened', 'onClose'].includes(type) && validators.isFunction(value))) && (defaultConfig = Object.assign({}, defaultConfig, { [type]: value }))
  }
}

/**
 * 清除配置
 * @param type {string} 配置选项
 */
iToast.resetConfig = function (type) {
  if (!type) {
    allowMulti = false
    defaultConfig = config
    return
  }
  if (!validators.isString(type)) {
    throw new Error('type is not string')
  }

  validators.isHasAttr(defaultConfig, type) && (defaultConfig[type] = config[type])
}

export default iToast