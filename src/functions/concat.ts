import arrayCheck from './arrayCheck';

const concat = (value: Array<Array<any>>) => {
  // 빈 배열
  let list = [];

  // 각 배열 안 요소의 값을 하나하나 검증 작업을 하면서 배열을 합친다
  value.map(object => {
    if (arrayCheck(object) === true) {
      list = Array.prototype.concat(list, object);
    }
  });

  // 리턴
  return list;
};

export default concat;
