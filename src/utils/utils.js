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

function formatDistance(distance) {
  return distance.toFixed(2);
}

function getStatusText(status) {
    const table = {
      normal: "正常",
      pause: "暂停(pause)",
      running: "正在执行",
      finished: "完成",
      suspend: "暂停(suspend)",
      terminated: "终止",
      aborted: "中断",
      inqueue: "执行前排队",
    };
    let formated = table[status];
    return formated?formated:status;
}

function getResultText(result) {
    const table = {
      success: "成功",
      error: "错误",
    };
    let formated = table[result];
    return formated?formated:result;
}

export default {
  getSchoolName,
  formatDistance,
  getStatusText,
  getResultText,
};