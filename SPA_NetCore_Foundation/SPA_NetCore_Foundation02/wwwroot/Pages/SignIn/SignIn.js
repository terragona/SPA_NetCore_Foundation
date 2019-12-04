﻿
/** 사인인 클래스 */
function SignIn()
{
    GlobalStatic.PageType_Now = PageType.SignIn;

    if (true === GlobalStatic.SignIn)
    {//이미 사인인이 되어있다.
        //홈으로 이동
        Page.Move_Home();
    }
    else
    {
        //내 인스턴스 전달
        var oThis = this;

        //페이지 공통 기능 제거
        Page.Remove();

        //사인 인 인터페이스
        DivMain.load(FS_FUrl.SignIn_SignIn
            , function () {
                //이메일
                oThis.txtEMail = $("#txtEMail");
                //비밀번호
                oThis.pwPassword = $("#pwPassword");
            });
    }
}

/** dom txtEMail : 이메일 */
SignIn.prototype.txtEMail = null;
/** dom pwPassword : 비밀 번호 */
SignIn.prototype.pwPassword = null;


/**
 * 사인인 시도
 */
SignIn.prototype.btnSignIn_onclick = function ()
{
    var sEMail = this.txtEMail.val();
    var sPW = this.pwPassword.val();

    GlobalStatic.SignIn = false;

    if (true === GlobalStatic.SignIn)
    {
        alert("이미 사인인이 되어 있습니다.");
    }
    else if ("" === sEMail)
    {
        alert("이메일을 입력하지 않았습니다.");
    }
    else if ("" === sPW)
    {
        alert("비밀번호를 입력하지 않았습니다.");
    }
    else
    {//성공
        AA.put(false, {
            url: FS_Api.Sign_SignIn
            , data: { sID: sEMail, sPW: sPW }
            , success: function (data) {
                console.log(data);

                if ("0" === data.infoCode) {//에러 없음
                    if (data.complete === true) {
                        GlobalStatic.SignIn = true;
                        GlobalStatic.SignIn_token = data.token;
                        GlobalStatic.SignIn_ID = sEMail;

                        alert("사인 인 성공");

                        //홈으로 이동
                        Page.Move_Home();
                    }
                }
                else {//에러 있음
                    //아웃풋 지우기
                    objThis.divOutput.html("");
                    alert("error code : " + data.infoCode + "\n"
                        + "내용 : " + data.message);
                }
            }
            , error: function (error) {
                console.log(error);

                alert("알수 없는 오류가 발생했습니다.");
            }
        });
    }

    
};