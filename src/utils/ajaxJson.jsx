import $ from "jquery"
const AjaxJson = {
  /*异步操作*/
  getResponse: (url, data, type) => {
    let promise = new Promise(function(resolve, reject) {
      let user = sessionStorage.getItem("user")
      if(user !== undefined) {
        AjaxJson.Ajax(url, data, type, resolve, reject)
      }
      else {
        location.hash = "/login"
      }
    })
    return promise;
  },
  /*请求操作*/
  Ajax: (url, data, type, resolve, reject) => {
    $.ajax({
      type: type,
      // url: url,
      url: "http://amy.wenchain.com" + url,
      contentType: "application/json",
      data: JSON.stringify(data),
      success:function(res){
        if(res.status === 8000) {
          // location.hash = "/login";
        }
        else {
          resolve(res)
        }
      },
      error:function(res){
        resolve(res)
      }
    });
  },
}

export default AjaxJson;