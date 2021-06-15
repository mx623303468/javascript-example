/**
 * 使用原生JS封装拖拽效果
 */
const initDrag = (element)=> {
    if (!isDom(element)) {
        element = document.querySelector(element)
    }
    
    let html = document.documentElement;
    
    element._minLeft = 0;
    element._minTop = 0;
    element._maxLeft = html.clientWidth - element.offsetWidth;
    element._maxTop = html.clientHeight - element.offsetHeight;

    element.addEventListener('mousedown', down);
}

const down = function(e){
    console.log(this, e);
    let { top, left } = this.getBoundingClientRect();
    
    this._startTop = top; // 元素的 top
    this._startLeft = left; // 元素的 left
    this._startX = e.clientX; // 鼠标按下的 X 坐标
    this._startY = e.clientY; // 鼠标按下的 Y 坐标

    // 保证 this 指向始终是当前元素
    this._move = move.bind(this); // 鼠标移动事件
    this._up = up.bind(this); // 鼠标松开事件
    window.addEventListener('mousemove', this._move);
    window.addEventListener('mouseup', this._up);
}

const move = function (e) {
    let currentLeft = e.clientX - this._startX + this._startLeft,
        currnetTop = e.clientY - this._startY + this._startTop;

    // 判断是否超出边界
    currentLeft = currentLeft < this._minLeft ? this._minLeft : (currentLeft > this._maxLeft ? this._maxLeft : currentLeft);
    currnetTop = currnetTop < this._minTop ? this._minTop : (currnetTop > this._maxTop ? this._maxTop : currnetTop);

    // set style
    this.style.left = `${currentLeft}px`;
    this.style.top = `${currnetTop}px`;
}

const up = function (e) {
    window.removeEventListener('mousemove', this._move);
    window.removeEventListener('mouseup', this._up);
}

const isDom = function(ele) {
    return typeof HTMLElement === 'object'
    ? ele instanceof HTMLElement
    : ele && typeof ele === 'object' && ele.nodeType === 1 && typeof ele.nodeName === 'string'
}
