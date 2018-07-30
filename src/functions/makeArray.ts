// {{}, {}, {}, {}, {}, {}, {}, {}} 형태의 객체를 받아다가
// [{}, {}, {}, {}, {}, {}, {}, {}] 형태의 배열 객체로 변환해주는 함수
const makeArray = (bigObject: {}) => {
  const list = [];

  Object.keys(bigObject).map(key => {
    list.push(bigObject[key]);
  });

  return list;
};

export default makeArray;
