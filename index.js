var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "STU-DB";
var stuRelationName = "StuData";
var connToken = "90938299|-31949273841068918|90952193";

$("#sturollno").focus();

function saveRecNo2LS(jsonObj) {
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", lvData.rec_no);
}

function getStuRollNoAsJsonObj() {
  var sturollno = $("#sturollno").val();
  var jsonStr = {
    id: sturollno,
  };
  return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
  saveRecNo2LS(jsonObj);
  var record = JSON.parse(jsonObj.data).record;
  $("#stuname").val(record.name);
  $("#stuclass").val(record.salary);
  $("#studob").val(record.studob);
  $("#stuaddress").val(record.stuaddress);
  $("#stuenrolldate").val(record.stuenrolldate);
}

function resetForm() {
  $("#sturollno").val("");
  $("#stuname").val("");
  $("#stuclass").val("");
  $("#studob").val("");
  $("#stuaddress").val("");
  $("#stuenrolldate").val("");
  $("#sturollno").prop("disabled", false);
  $("#save").prop("disabled", true);
  $("#change").prop("disabled", true);
  $("#reset").prop("disabled", true);
  $("#sturollno").focus();
}

function validateData() {
  var sturollno, stuname, stuclass, studob, da, stuenrolldate;
  sturollno = $("#sturollno").val();
  stuname = $("#stuname").val();
  stuclass = $("#stuclass").val();
  studob = $("#studob").val();
  stuaddress = $("#stuaddress").val();
  stuenrolldate = $("#stuenrolldate").val();

  if (sturollno === "") {
    alert("Employee ID missing");
    $("#sturollno").focus();
    return "";
  }
  if (stuname === "") {
    alert("Employee Name missing");
    $("#stuname").focus();
    return "";
  }
  if (stuclass === "") {
    alert("Employee Salary missing");
    $("#stuclass").focus();
    return "";
  }
  if (studob === "") {
    alert("studob missing");
    $("#studob").focus();
    return "";
  }
  if (stuaddress === "") {
    alert("Address missing");
    $("#stuaddress").focus();
    return "";
  }
  if (stuenrolldate === "") {
    alert("Deduction missing");
    $("#stuenrolldate").focus();
    return "";
  }

  var jsonStrObj = {
    id: sturollno,
    name: stuname,
    salary: stuclass,
    studob: studob,
    stuaddress: stuaddress,
    deduction: stuenrolldate,
  };

  return JSON, stringify(jsonStrObj);
}

function saveData() {
  var jsonStrObj = validateData();

  if (jsonStrObj === "") {
    return "";
  }

  var putRequest = createPUTRequest(
    connToken,
    jsonStrObj,
    stuDBName,
    stuRelationName
  );

  jQuery.ajaxSetup({ async: false });

  var resJsonObj = executeCommandAtGivenBaseUrl(
    putRequest,
    jpdbBaseURL,
    jpdbIML
  );

  jQuery.ajaxSetup({ async: true });

  resetForm();
  $("#sturollno").focus();
}

function getStu() {
  var sturollnoJsonObj = getStuRollNoAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    connToken,
    stuDBName,
    stuRelationName,
    stuRollNoJsonObj
  );
  jQuery.ajaxSetup({ async: false });

  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbBaseURL,
    jpdbURL
  );
  jQuery.ajaxSetup({ async: true });

  if (resJsonObj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
  } else if (res.JsonObj.status == 200) {
    $("#sturollno").prop("disabled", true);
    fillData(resJsonObj);

    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
  }
  $("#stuname").focus();
}

function changeData() {
  $("#change").prop("disabled", true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecord(
    connToken,
    jsonChg,
    stuDBName,
    stuRelationName,
    localStorage.getItem("recno")
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    jpdbBaseURL,
    jpdbIML
  );

  resetForm();
  $("#sturollno").focus();
}
