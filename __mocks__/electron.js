/* Mocks of all parts of the electron API that we use.

None of the electron APIs are available in a node env, even though
electron is a node module. (Note that node_modules/electron/index.js only
exports the filepath to the electron exe.)

APIs are only available in an electron browser environment, but our tests
run in node where all electron's exports are undefined. So we must mock,
even for APIs that would otherwise seem okay to call during a test.
*/

import path from 'path';

export const app = {
  getPath: jest.fn().mockImplementation(
    () => path.resolve('tests/data')
  )
};

export class BrowserWindow {
  constructor() {
    this.loadURL = jest.fn();
    this.once = jest.fn();
    this.on = jest.fn();
    this.webContents = {
      on: jest.fn(),
      session: {
        on: jest.fn()
      }
    };
  }
}

export const dialog = {
  showOpenDialog: jest.fn(),
  showSaveDialog: jest.fn(),
};

// TODO - is ReturnThis necessary? What are the implications?
export const ipcMain = {
  on: jest.fn().mockReturnThis(),
  handle: jest.fn().mockReturnThis(),
  handleOnce: jest.fn().mockReturnThis(),
};

export const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
  invoke: jest.fn().mockImplementation(() => Promise.resolve()),
};

export const Menu = {
  buildFromTemplate: jest.fn(),
  setApplicationMenu: jest.fn(),
};

export const nativeTheme = {};

export const screen = {
  getPrimaryDisplay: jest.fn().mockReturnValue({
    workAreaSize: { width: 800, height: 800 }
  })
};
