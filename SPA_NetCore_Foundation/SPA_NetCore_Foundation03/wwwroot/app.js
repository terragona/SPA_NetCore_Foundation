﻿// 라우트 어플리케이션 생성
var app = Sammy(function () {

    //라우트 설정****
    //Page에 페이지 이동 공통화가 있는데 여기서는 사용하면
    //무한루프에 빠질 수 있다.
    //이곳은 location.href로만 이동해야 한다.

    this.get("/", function ()
    {
        app.RouteCheck(function ()
        {
            //this.RouteCheck에서 로그인 체크를 해준다.
            //그러니 여기서는 홈으로만 이동하면 된다.
            location.href = FS_Url.Home;
        });
    });

    this.get(FS_Url.Error + "/:code", function ()
    {
        //파라미터 받기
        var nCode = this.params["code"];

        app.RouteCheck(function ()
        {
            //객체 생성
            GlobalStatic.Page_Now = new Error(nCode);
        });
    });

    this.get(FS_Url.SignIn, function ()
    {
        if (true === GlobalSign.SignIn)
        {//로그인 되어 있음
            //홈으로 이동
            location.href = FS_Url.Home;
        }
        else
        {//로그인 되어있지 않음
            //객체 생성
            GlobalStatic.Page_Now = new SignIn();
        }

    });


    this.get(FS_Url.Home, function ()
    {
        app.RouteCheck(function ()
        {
            //객체 생성
            GlobalStatic.Page_Now = new Home();
        });
    });




    this.get(FS_Url.Test01, function () 
    {
        app.RouteCheck(function ()
        {
            //객체 생성
            GlobalStatic.Page_Now = new Test01();
        });
    });

    this.get(FS_Url.Test02, function () 
    {
        app.RouteCheck(function ()
        {
            //객체 생성
            GlobalStatic.Page_Now = new Test02();
        });
    });

    //this.get("#/", function () {
    //    //인덱스 페이지
    //    //$("#divMain").load("/Pages/index.html");
    //    DivMain.html("홈");
    //});

    //this.get("#/param/:id", function () {
    //    //파라미터 받기
    //    var nID = this.params['id'];

    //    $("#divMain").html("넘어온 파라미터 id : " + nID);
    //});

    //에러 처리용
    this.ErrorFun = function (sCode)
    {
        var sCodeTemp = sCode;

        //사인인 필수 페이지
        app_Assist.RouteCheck(false
            , function ()
            {
                //객체 생성
                GlobalStatic.Page_Now = new Error(sCodeTemp);
            });
    };

    //404
    this.notFound = function (verb, path) 
    {
        switch (GlobalStatic.SiteType)
        {
            case 0://일반
                Page.Move_Page(false, FS_Url.Error + "/" + "404");
                break;
            case 1://어드민 타입
                //사인인이 되어 있을때 -> 컨탠츠 영역에 출력한다.
                //사인인이 되어 있지 않을때 -> 사인인 페이지, 메시지 출력
                if (true === GlobalSign.SignIn)
                {
                    Page.Move_Page(false, FS_Url.Error + "/" + "404");
                }
                else
                {
                    alert("404, 페이지를 찾지 못했습니다.");
                    Page.Move_Page(false, FS_Url.SignIn);
                }
                break;
        }
    };
});

/**
* 라우트 체크.
* 불허에 따른 작업은 이곳에서 한다.
* @param {function} callback 허가가 났으면 동작시킬 콜백
*/
app.RouteCheck = function (callback)
{
    var bReturn = true;

    switch (GlobalStatic.SiteType)
    {
        case 1://어드민 타입
            if (false === GlobalSign.SignIn)
            {//로그인 안되있음

                //실패 알림
                bReturn = false;
                //로그인 페이지로 이동
                GlobalSign.Move_SignIn();
            }
            break;

        case 0://기본 타입
        default:
            bReturn = true;
            break;
    }

    if (true === bReturn)
    {//허가가 났다.
        //콜백 호출
        callback();
    }
};

//어플리케이션 시작
$(function () {
    app.run();
});