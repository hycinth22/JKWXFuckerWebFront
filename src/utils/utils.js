function getSchoolName(schoolID) {
    const table = {
      60: "长春大学",
      67: "长春科技学院",
      68: "吉林工商学院",
      69: "吉林工程技术师范学院",
    };
    let formated = table[schoolID];
    return formated?formated:schoolID;
}

export default {
  getSchoolName,
};