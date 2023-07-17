const KEY = 'state';

/**
 * 로컬 스토리지에 상태를 저장한다.
 * @type {(state: object) => void}
 */
export const saveState = state => {
  if (typeof state !== 'object') throw new TypeError('매개변수 state에는 객체가 전달되어야 합니다.');

  const serializedState = JSON.stringify(state);
  localStorage.setItem(KEY, serializedState);
};

// 로컬 스토리지에서 상태를 로드한다.
export const loadState = () => {
  const serializedState = localStorage.getItem(KEY);
  return JSON.parse(serializedState);
};
