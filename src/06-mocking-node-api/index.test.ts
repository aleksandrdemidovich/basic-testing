// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import { join } from 'path';

jest.mock('fs/promises');
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'example.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(existsSyncMock).toHaveBeenCalledWith(join(__dirname, pathToFile));

    existsSyncMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'example.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();

    existsSyncMock.mockRestore();
  });

  // test('should return file content if file exists', async () => {
  //   const pathToFile = 'example.txt';
  //   const fileContent = 'File content';

  //   const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  //   const readFileMock = jest.spyOn(fs.promises, 'readFile').mockResolvedValue(Buffer.from(fileContent));

  //   const result = await readFileAsynchronously(pathToFile);

  //   expect(result).toBe(fileContent);

  //   existsSyncMock.mockRestore();
  //   readFileMock.mockRestore();
  // });
});
