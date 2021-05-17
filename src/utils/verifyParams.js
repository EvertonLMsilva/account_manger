module.exports = {
  async verifyParamsForDB(data) {
    let result = false;
    await data.map((item) => {
      if (Object.values(item) == undefined || Object.values(item) == "") {
        result = { err: `Campo ${Object.keys(item)} não pode ser vazio!` };
      }
    });
    return result;
  },
};
