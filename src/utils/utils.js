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
      inqueue: "排队中准备执行",
      running: "正在执行",
      finished: "完成待确认",
      terminated: "完成已确认",
      pause: "暂停(待续)",
      suspend: "暂停(故障)",
      aborted: "停止",
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