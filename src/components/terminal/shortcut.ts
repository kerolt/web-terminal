import { TerminalType } from "./terminal";

interface ShortcutType {
  code: string;
  desc?: string;
  keyDesc?: string;

  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;

  doAction: (e: KeyboardEvent, terminal: TerminalType) => void;
}

/**
 * 快捷键列表
 */
export const shortcutList: ShortcutType[] = [
  {
    code: "KeyL",
    desc: "清屏",
    keyDesc: "Ctrl + L",
    ctrlKey: true,
    doAction(e, terminal) {
      e.preventDefault();
      terminal.clear();
    }
  },
  {
    code: "KeyO",
    desc: "折叠",
    keyDesc: "Ctrl + O",
    ctrlKey: true,
    doAction(e, terminal) {
      e.preventDefault();
      terminal.toggleAllCollapse();
    }
  },
  {
    code: "KeyV",
    desc: "粘贴",
    keyDesc: "Ctrl + V",
    metaKey: true,
    doAction(e, terminal) {
      terminal.focusOnInput();
    }
  },
  {
    code: "Tab",
    desc: "补全",
    doAction(e, terminal) {
      e.preventDefault();
      if (terminal.isInputFocused()) {
        terminal.setTabCompletion();
      } else {
        terminal.focusOnInput();
      }
    }
  },
  {
    code: "Backspace",
    doAction(e, terminal) {
      terminal.focusOnInput();
    }
  },
  {
    code: "Enter",
    doAction(e, terminal) {
      terminal.focusOnInput();
    }
  },
  {
    desc: "查看上一条命令",
    code: "ArrowUp",
    keyDesc: "↑",
    doAction(e, terminal) {
      e.preventDefault();
      terminal.showPrevCommand();
    }
  },
  {
    desc: "查看下一条命令",
    code: "ArrowDown",
    keyDesc: "↓",
    doAction(e, terminal) {
      e.preventDefault();
      terminal.showNextCommand();
    }
  }
];

/**
 * 快捷键依靠document.onkeydown来实现，监听相应的按键来执行对应的操作
 * @param terminal 终端对象
 */
export const registerShortcuts = (terminal: TerminalType) => {
  document.onkeydown = (e) => {
    // 检测key是否为字母，如果是，将光标聚焦于输入框
    const key = e.key;
    if (key >= "a" && key <= "z" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      terminal.focusOnInput();
      return;
    }

    // 匹配快捷键
    for (const shortcut of shortcutList) {
      // if语句中shortcut的boolean类型的属性需要使用!!，因为没有定义时其值为undefined
      if (
        shortcut.code === e.code &&
        !!shortcut.ctrlKey === e.ctrlKey &&
        !!shortcut.metaKey === e.metaKey &&
        !!shortcut.shiftKey === e.shiftKey
      ) {
        shortcut.doAction(e, terminal);
      }
    }
  };
};
