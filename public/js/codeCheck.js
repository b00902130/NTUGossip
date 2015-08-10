var code;

Parse.initialize("7fddgKWTO9XoFuYjRi0i8XacKX97i6PYV6fdWpA7", "99XlWsWD7wjRQF6C6tlPXdAmOUaWoPAVEF0IIKCe");
var NTUGossipPost = Parse.Object.extend("NTUGossipPost");

function createCode() {
    code = "";
    var codeLength = 6; //驗證碼的長度
    var checkCode = document.getElementById("checkCode") ;
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'a','b','c','d','e','f' ,'g','h','i','j','k','l','m','n','o','p','q','r',' s','t','u','v','w','x','y','z','A', 'B', 'C', 'D', 'E' , 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', ' R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候選組成驗證碼的字符，當然也可以用中文的
    for (var i = 0; i < codeLength; i++){
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    if (checkCode){
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
    $('#inputCode').focus();
}

function validateCode(){
    var inputCode = document.getElementById("inputCode").value;
    var ntuGossipPost = new NTUGossipPost()
    ntuGossipPost.set("message", $('#gossipText').val());
    ntuGossipPost.set("isConfirm", false);
    var text = $('#gossipText').val();
    var nowDate = Date();
    if( text == ""){
      alert("請輸入內容！");
      return "Failed";
    }
    if (inputCode.length <= 0){
        alert("請輸入驗證碼！");
    }
    else if (inputCode.toUpperCase() != code.toUpperCase()){
        alert("驗證碼輸入有誤！");
        createCode();
    }
    else{
        if(confirm("驗證碼正確！確定送出？")){
            ntuGossipPost.save(null, {
                success: function(ntuGossipPost) {
                // Execute any logic that should take place after the object is saved.
                    // alert('New object created with objectId: ' + ntuGossipPost.id);
                    alert("送出成功。");
                },
                error: function(ntuGossipPost, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        }
        else{
          ;
        }
    }
}

$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13' && !$("#gossipText").is(":focus")){
    validateCode();
  }
})
