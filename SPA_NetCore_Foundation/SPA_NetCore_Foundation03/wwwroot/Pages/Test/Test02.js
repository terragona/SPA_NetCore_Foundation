﻿
function Test02()
{
    GlobalStatic.PageType_Now = this.constructor.name;

    var objThis = this;

    //페이지 공통기능 로드
    Page.Load({}, function ()
    {
        //화면 인터페이스
        Page.divContents.load("/Pages/Test/Test02.html"
            , function () {
                objThis.divOutput = $("#divOutput");
            });
    });
}

/** 출력용 div */
Test02.prototype.divOutput = null;

/**
 * 데이터 호출 테스트
 * @param {int} nData 전달할 값
 */
Test02.prototype.Test01 = function (nData)
{
    var objThis = this;
    AA.get(AA.TokenRelayType.None
        , {
            url: FS_Api.Test_Test01
            , data: { nData: nData, sData: "테스트 01" }
            , success: function (data)
            {
                console.log(data);

                if ("0" === data.InfoCode)
                {//에러 없음
                    objThis.divOutput.html("nTest : " + data.nTest + " sTest : " + data.sTest);
                }
                else
                {//에러 있음
                    //아웃풋 지우기
                    objThis.divOutput.html("");
                    alert("error code : " + data.InfoCode + "\n"
                        + "내용 : " + data.message);
                }
            }
            , error: function (error)
            {
                console.log(error);
            }
        });
};
