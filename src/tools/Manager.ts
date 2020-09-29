import { Declaration, Source, Rule } from 'postcss';
import CSSFileInspector from './file-handlers/css';
interface EventCallback {
  (data: object): void;
}

class Event {
  events: {
    [key: string]: Array<EventCallback>
  };
  constructor() {
    this.events = {

    }
  }
  bind(ev: string, cb: EventCallback) {
    if (!this.events[ev]) {
      this.events[ev] = [];
    }

    this.events[ev].push(cb);
  }
  trigger(ev: string, data: object) {
    if (this.events[ev]) {
      this.events[ev].forEach(fn => {
        fn(data);
      })
    }
  }
}

interface CSSChange {
  type: UpdateActiveBlockType,
  prop: string,
  value?: any
}

type UpdateActiveBlockType = 'add' | 'delete';

interface EditableBlock {
  selector: string;
  declarations: Declaration[];
  source?: Source;
  rule: Rule;
}



class StyleEditor {
  private cssEvent: Event; // CSS的事件
  private onReceiveCSSFn?: EventCallback; // 获取CSS的callback
  private onPostCSSChangeFn?: EventCallback; // 发送CSS修改
  private activeBlock: EditableBlock | undefined;
  constructor() {
    const self = this;
    this.cssEvent = new Event();

    this.cssEvent.bind('receive-css', function(data: object) {
      if (typeof self.onReceiveCSSFn === 'function') {
        self.onReceiveCSSFn(data);
      }
    });

    this.cssEvent.bind('post-css', function(data: object) {
      if (typeof self.onPostCSSChangeFn === 'function') {
        self.onPostCSSChangeFn(data as CSSChange);
      }
    });
  }
  // 用户接收到css修改
  onReceiveCSSChange(fn: EventCallback) {
    this.onPostCSSChangeFn = fn;
  }
  // 发送css修改
  postCSSChange(data: CSSChange) {
    // this.cssEvent.trigger('post-css', data);
    this.handleCSSChange(data.prop, data.value, data.type);
  }
  private handleCSSChange(prop: string, value: any, type: string) {
    let updatedCSS = '';
    if (type === 'add' && value !== "") {
      updatedCSS = CSSFileInspector.updateProperty(this.activeBlock as EditableBlock, prop, value, '');
    } else {
      updatedCSS = CSSFileInspector.removeProperty(this.activeBlock as EditableBlock, prop);
    }

    this.cssEvent.trigger('post-css', {
      css: updatedCSS
    });
  }
  // 收到CSS
  onReceiveCSS(fn: EventCallback) {
    this.onReceiveCSSFn = fn;
  }
  // 用户发送css
  postCSS(cssString: string) {
    let payload = {};
    const blocks = CSSFileInspector.getEditableBlocks(cssString, '');
    // TODO 暂时取第一个
    this.activeBlock = blocks[0];

    if (this.activeBlock) {
      payload = this.activeBlock.declarations.reduce((prev: any, declaration) => {
        prev[declaration.prop] = declaration.value;
        return prev;
      }, {});
    }

    this.cssEvent.trigger('receive-css', payload);
  }
}


const editor = new StyleEditor();

export default editor;