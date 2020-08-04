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
    toast.toastDOM.classList.add('iu-toast-text')
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
      toast.iconDOM.className = 'iu-toast_icon iu-toast_success'
      return
    }
    if (toast.loadingDOM) {
      toast.toastDOM.removeChild(toast.loadingDOM)
      toast.loadingDOM = null
    }
    toast.createIcon('iu-toast_success');
  },
  'fail': function (toast) {
    if (toast.iconDOM) {
      toast.iconDOM.className = 'iu-toast_icon iu-toast_fail'
      return
    }
    if (toast.loadingDOM) {
      toast.toastDOM.removeChild(toast.loadingDOM)
      toast.loadingDOM = null
    }
    toast.createIcon('iu-toast_fail');
  }
}

// 设置位置
const setPosition = {
  'middle': function () {
    return 'iu-toast_middle'
  },
  'top': function () {
    return 'iu-toast_top'
  },
  'bottom': function () {
    return 'iu-toast_bottom'
  }
}

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
    toastBox.className = 'iu-toast iu-fade-enter';
    toastBox.style.display = 'none';
    return toastBox
  }

  // 创建icon
  createIcon (typeClass) {
    this.iconDOM = document.createElement('i');
    this.iconDOM.className = 'iu-toast_icon ' + typeClass;
    this.toastDOM.insertBefore(this.iconDOM, this.toastDOM.childNodes[0]);
  }

  // 创建文本容器
  createText () {
    const textBox = document.createElement('div');
    textBox.className = 'iu-toast_text';
    return textBox
  }

  loading () {
    this.loadingDOM = document.createElement('div');
    this.loadingDOM.className = 'iu-toast_loading';
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
      document.body.classList.add('iu-toast_overlay')
    } else {
      document.body.classList.remove('iu-toast_overlay')
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
}

let toast;
const Toast = (function () {
  let timer;
  const defaultConfig = {
    type: 'text',
    position: 'middle',
    message: '',
    overlay: false,
    forbidClick: false,
    duration: 2000,
    onOpened: null,
    onClose: null
  }

  return function (opt) {
    clearTimeout(timer)
    // 合并配置
    let temp;
    if (typeof opt === 'string') {
      temp = { message: opt }
    } else if (typeof opt === 'object' && !Array.isArray(opt)) {
      temp = opt
    } else {
      throw new Error('params is string or object');
    }
    const config = Object.assign({}, defaultConfig, temp);

    if (!toast) {
      toast = new CreateToast()
    }

    // 重置class
    toast.toastDOM.className = 'iu-toast'
    // 添加过渡动画
    if (!timer) {
      toast.toastDOM.classList.add('iu-fade-enter')
    }
    // 设置位置
    toast.toastDOM.classList.add(setPosition[config.position]() || '')

    // 设置是否可点
    config.forbidClick && document.body.classList.add('iu-toast_unclickable')
    // 设置遮罩层
    config.overlay && toast.showOverlay(true)

    // 不同type的操作不同
    doType[config.type] && doType[config.type](toast);
    // 修改文本
    toast.text(config.message);

    toast.show()
    // 过渡动画
    if (!timer) {
      setTimeout(function () {
        toast.toastDOM.classList.remove('iu-fade-enter')
      }, 1)
    }

    config.onOpened && config.onOpened()

    if (config.duration === 0) {
      return
    }

    timer = setTimeout(function () {
      // 过渡动画
      toast.toastDOM.classList.add('iu-fade-enter')
      setTimeout(function () {
        timer = null
        // 过渡动画
        toast.toastDOM.classList.remove('iu-fade-enter')
        toast.hide()

        config.forbidClick && document.body.classList.remove('iu-toast_unclickable')
        config.overlay && toast.showOverlay(false)
        config.onClose && config.onClose()
      }, 200)
    }, config.duration)
  }
})()

Toast.loading = function (opt) {
  let temp
  opt = opt || { message: '加载中...', type: 'loading', forbidClick: true }
  if (typeof opt === 'string') {
    temp = { message: opt, type: 'loading', forbidClick: true }
  } else if (typeof opt === 'object' && !Array.isArray(opt)) {
    temp = Object.assign({}, opt, { type: 'loading', forbidClick: true });
  } else {
    throw new Error('params is string or object');
  }
  Toast(temp)
}

Toast.success = function (opt) {
  let temp
  opt = opt || { message: '成功', type: 'success' }
  if (typeof opt === 'string') {
    temp = { message: opt, type: 'success' }
  } else if (typeof opt === 'object' && !Array.isArray(opt)) {
    temp = Object.assign({}, opt, { type: 'success' });
  } else {
    throw new Error('params is string or object');
  }
  Toast(temp)
}

Toast.fail = function (opt) {
  let temp
  opt = opt || { message: '失败', type: 'fail' }
  if (typeof opt === 'string') {
    temp = { message: opt, type: 'fail' }
  } else if (typeof opt === 'object' && !Array.isArray(opt)) {
    temp = Object.assign({}, opt, { type: 'fail' });
  } else {
    throw new Error('params is string or object');
  }
  Toast(temp)
}

Toast.clear = function () {
  toast.hide()
  document.body.classList.remove('iu-toast_unclickable')
  toast.showOverlay(false)
}