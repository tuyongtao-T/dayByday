//防抖：事件被触发后延迟N秒在执行，如果在此期间再次被触发，则重新计时
function debounce(fn, delay){
  let timer = null; // 声明计时器
  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

// 函数节流：事件被触发后，在N秒内只执行一次相同的函数，
function throttle(fn, delay) {
    let timer = null;
    return function() {
      let that= this;
      let args = arguments;
      if (!timer) {//如果没有计时就不执行，每个一段时间执行一次
        timer = setTimeout(function() {
          timer = null;
          fn.apply(that, args);
        }, delay)
      }
    }
}

