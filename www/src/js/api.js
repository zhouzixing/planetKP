
define('js/api',function(require, exports, module) {
    var host = G.host;
    var host2 = G.host2;

    var domain = host+ "action/";
    G.url = {
        "clientId": "c1ebe466-1cdc-4bd3-ab69-77c3561b9dee",
        "clientSecret": "d8346ea2-6017-43ed-ad68-19c0f971738b",

      // 支付调用ping++ 时候使用
        "app_id" : "app_0qrnvT9uPan50aPS",

        login : domain + 'student/studentLogin.action',
        getCode: domain + 'student/getMobileSendMsg.action',
        sendCode: domain + 'student/getMobileCodeResult.action',
        insertStudent: domain + 'student/insertStudent',
        checkStudent: domain + "student/checkStudent.action",
        updateStudent: domain + "student/updateStudent.action",

        getAdImages : domain + 'publicImage/getAppImages.action',
        getChargeList : domain + 'charge/selectChargeList',
        chargeSubmit : domain + 'charge/appChargeMoney.action',

        insertMaintain: domain + 'maintain/insertMaintain',

        getSchoolList: domain + 'school/selectSchoolList',
        getMarjorList: domain + 'school/selectMarjorBySCId',
        getMarjorDetail: domain + 'school/appSelectMajorById.action',


        zl_request : host2 + 'httpI.action',
    };
});
