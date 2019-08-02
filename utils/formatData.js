export const formatData = (response, formatType) => {
  const res = {
    ...response,
    data: response.data.map(data => ({
      ...data,
      name: data.name.length > 25 ?
        data.short_name : data.name
    })),
  };

  return res;
};

export const formatSingleData = data => ({
  ...data,
  university: {
    ...data.university,
    name: data.university.name.length > 20 ? data.university.short_name : data.university.name
  }
});

export const objToArr = o => Object.keys(o).map(key => o[key]);

export default {
  formatData,
  formatSingleData,
  objToArr,
};
