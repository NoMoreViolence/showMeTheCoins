import objectCheck from './objectCheck';

// {{}, {}, {}, {}, {}, {}, {}, {}} 형태의 객체 객체를 받아다가
// [{}, {}, {}, {}, {}, {}, {}, {}] 형태의 배열 객체로 변환해주는 함수
const makeArray = (bigObject: {}): Array<any> => {
  const list = [];
  if (objectCheck(bigObject)) {
    Object.keys(bigObject).map(key => {
      list.push(bigObject[key]);
    });
  }

  return list;
};

export default makeArray;
