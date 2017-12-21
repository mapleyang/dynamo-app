import $ from "jquery"
const AjaxJson = {
  /*异步操作*/
  getResponse: (url, data, type) => {
    let promise = new Promise(function(resolve, reject) {
      AjaxJson.Ajax(url, data, type, resolve, reject)
    })
    return promise;
  },
  /*请求操作*/
  Ajax: (url, data, type, resolve, reject) => {
    $.ajax({
      type: type,
      url: url,
      contentType: "application/json",
      data: JSON.stringify(data),
      success:function(res){
        resolve(res)
      },
      error:function(res){
        resolve(res)
      }
    });
  },
}

export default AjaxJson;