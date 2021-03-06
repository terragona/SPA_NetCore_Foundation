﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPA_NetCore_Foundation.Model.ApiModel;
using SPA_NetCore_Foundation.Model;

namespace SPA_NetCore_Foundation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ObjectResult> Call()
        {
            ObjectResult apiresult = new ObjectResult(200);

            apiresult = StatusCode(200, "성공!");

            return apiresult;
        }

        [HttpGet]
        public ActionResult<TestModel01> Test01(int nData, string sData)
        {
            //리턴 보조
            ApiResultReadyModel armResult = new ApiResultReadyModel(this);
            //리턴용 모델
            TestModel01 tmResult = new TestModel01();

            if(0 <= nData)
            {//양수다.
                tmResult.nTest = nData;
                tmResult.sTest = sData;
            }
            else
            {
                armResult.StatusCode = StatusCodes.Status500InternalServerError;

                armResult.InfoCode = "1";
                armResult.Message = "'nData'에 음수가 입력되었습니다.";
            }

            return armResult.ToResult(tmResult);
        }

        
        [HttpGet]
        [Authorize]//OAuth2 인증 설정
        public ActionResult<TestModel02> Test02(int nData)
        {
            //리턴 보조
            ApiResultReadyModel armResult = new ApiResultReadyModel(this);
            //리턴용 모델
            TestModel02 tmResult = new TestModel02();

            //유저 정보 추출
            ClaimModel cm = new ClaimModel(((ClaimsIdentity)User.Identity).Claims);

            if (0 <= nData)
            {//양수다.
                tmResult.nTest001 = nData;
                tmResult.sTest002 = "성공 했습니다! : " + cm.id;
            }
            else
            {
                armResult.StatusCode = StatusCodes.Status500InternalServerError;

                armResult.InfoCode = "1";
                armResult.Message = "'nData'에 음수가 입력되었습니다.";
            }

            return armResult.ToResult(tmResult);
        }
    }
}