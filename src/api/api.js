const API_ROOT = "https://jkwx.moew.xyz/api/";

var axios = require('axios');
var api_root = API_ROOT;
function getAllAccounts() {
    return axios.get(api_root + "account")
    .then(function (response) {
        if (response.status === 200) {
            return response.data;
        } else {
            throw "Status Code !== 200";
        }
    })
    .catch(function (err) {
        console.error("Fetch Error:" + err);
    });
}

function getSportResult(uid) {
      return axios.get(api_root + "sportResult/" + uid.toString())
      .then(function (response) {
          if (response.status === 200) {
              return response.data;
          } else {
              throw "Status Code !== 200";
          }
      })
      .catch(function (err) {
          console.error("Fetch Error:" + err);
      });
}

function getAccountLog(uid, offset, limit) {
      return axios.get(api_root + "account/" + uid.toString() + "/logs/?offset="+offset.toString()+"&limit="+limit.toString())
      .then(function (response) {
          if (response.status === 200) {
              return response.data;
          } else {
              throw "Status Code !== 200";
          }
      })
      .catch(function (err) {
          console.error("Fetch Error:" + err);
      });
}

export default {
  getAllAccounts,
  getSportResult,
  getAccountLog,
};