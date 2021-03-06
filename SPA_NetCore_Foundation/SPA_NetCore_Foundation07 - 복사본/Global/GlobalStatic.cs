﻿using IdentityServer4_Custom.IdentityServer4;
using ModelDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPA_NetCore_Foundation.Global
{
    /// <summary>
    /// 전역변수 모음
    /// </summary>
    public static class GlobalStatic
    {
        /// <summary>
        /// 토큰 처리관련
        /// </summary>
        public static TokenProcess TokenProc = null;

        /// <summary>
        /// DB 타입
        /// </summary>
        public static string DBType = "";
        /// <summary>
        /// DB 컨낵션 스트링 저장
        /// </summary>
        public static string DBString = "";

        /// <summary>
        /// 메모리에 올라온 세팅정보
        /// </summary>
        public static List<Setting_Data> Setting_Data;

        /// <summary>
        /// DB에서 세팅 정보를 불러 메모리에 저장한다.
        /// DB에서 세팅을 수정하였다면 이 함수를 호출하여 메모리를 갱신해야한다.
        /// </summary>
        public static void Setting_Load()
        {
            using (SpaNetCoreFoundationContext db1 = new SpaNetCoreFoundationContext())
            {
                Setting_Data
                    = db1.Setting_Data
                        .ToList();
            }
        }
    }//end class GlobalStatic
}
