"use strict";angular.module("oasApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngCookies","ui.bootstrap","angularFileUpload"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","$cookies","Session","USER_ROLES","AuthService",function(a,b,c,d,e,f){a.session=d,a.session.user=d.user,a.isAuthenticated=f.isAuthenticated,c.authToken&&a.session.restoreSession(),a.$on("$locationChangeStart",function(c,d){a.isAuthenticated()||"views/login.html"===d.templateUrl||(a.session.destroy(),b.path("/login"))}),a.$on("not_authenticated",function(){alert("Please login to continue."),a.session.destroy(),b.path("/login")})}]),angular.module("oasApp").controller("ManpowerCtrl",["$scope",function(a){a.searchEmployee="",a.alphabetList="A",a.currentPanel="salary",a.isPanel=function(b){return a.currentPanel===b},a.setPanel=function(b){a.currentPanel=b}}]).directive("manpowerTab",function(){return{templateUrl:"views/manpower.html"}}),angular.module("oasApp").controller("ProjectsCtrl",["$scope",function(a){a.currentPanel="profiles"}]).directive("projectsTab",function(){return{templateUrl:"views/projects.html"}}),angular.module("oasApp").controller("LoginCtrl",["$rootScope","$scope","$modal","$timeout","$location","AUTH_EVENTS","AuthService",function(a,b,c,d,e,f,g){b.credentials={email:"testing@oaspainting.com",password:"oasadmin123!"},b.login=function(c){g.login(c).then(function(c){a.session.create(c),e.path("/dashboard"),b.generalsettings()})},b.forgotpassword=function(){var a=c.open({templateUrl:"views/modal/forgotpassword.html",controller:"ForgotpasswordCtrl",backdrop:"static",backdropClass:"backdrop-oas",size:"sm",windowClass:"modal-oas vertical-center forgotpassword-modal"});a.result.then(function(){})},b.generalsettings=function(){var a=c.open({templateUrl:"views/modal/generalsettingsmodal.html",controller:"GeneralsettingsmodalCtrl",backdrop:"static",backdropClass:"backdrop-oas",windowClass:"modal-oas generalsettings-modal"});a.result.then(function(){})}}]).directive("login",function(){return{templateUrl:"views/login.html"}}),angular.module("oasApp").controller("DashboardCtrl",["$rootScope","$scope","$location","$modal","ManpowerService","AttendanceService","SalaryService","SettingsService","ProjectsService",function(a,b,c,d,e,f,g,h,i){b.session.user=a.session.user,console.log("dashboard user : ",b.session.user);var j=new Date,k=j.getDate(),l=j.getMonth()+1,m=j.getFullYear();10>l&&(l="0"+l),10>k&&(k="0"+k),b.today=m+"-"+l+"-"+k,b.settingsService=h,b.settingsService.settings=h.settings,b.$on("settings_changed",function(){b.settingsService.getSettings(b.session.user)}),b.manpowerService=e,b.manpowerService.profiles=e.profiles,b.manpowerService.profilesArchived=e.profilesArchived,b.manpowerService.getProfiles(b.session.user),b.manpowerService.getProfilesArchived(b.session.user),b.$on("profile_created",function(){b.manpowerService.getProfiles(b.session.user)}),b.$on("profiles_changed",function(){b.manpowerService.getProfiles(b.session.user),b.manpowerService.getProfilesArchived(b.session.user)}),b.projectsService=i,b.projectsService.projects=i.projects,b.projectsService.getProjects(b.session.user),b.$on("projects_changed",function(){b.projectsService.getProjects(b.session.user)}),b.attendanceService=f,b.attendanceService.attendances=f.attendances,b.$on("update_attendance",function(a,c){b.attendanceService.getAttendances(c,b.session.user)}),b.salaryService=g,b.salary=g.salary,b.$on("update_salary",function(a,c){c||(c=b.today),b.salaryService.getDailySalary(c,b.session.user),b.salaryService.getMonthlySalary(c,b.session.user)}),b.currentTab="manpower",b.isEquals=function(a,b){return a===b},b.setTab=function(a){b.currentTab=a},b.launchErrorModal=function(a){d.open({templateUrl:"views/modal/errormodal.html",controller:"ErrormodalCtrl",backdrop:"static",backdropClass:"backdrop-oas",windowClass:"modal-oas vertical-center error-modal",resolve:{modalInfo:function(){return{errors:a}}}})},b.logout=function(){console.log("Logout"),b.session.destroy(),c.path("/login")}}]),angular.module("oasApp").controller("ProfilesCtrl",["$rootScope","$scope","$modal","ManpowerService",function(a,b,c){b.viewtype="current",b.newProfile=!1,b.isView=function(a){return a===b.viewtype},b.$on("profile_created",function(){b.newProfile=!1}),b.deleteProfileConfirmation=function(d){var e=c.open({templateUrl:"views/modal/deleteconfirmation.html",controller:"DeleteconfirmationCtrl",backdrop:"static",backdropClass:"backdrop-oas",size:"sm",windowClass:"modal-oas vertical-center deleteconfirmation-modal",resolve:{modalInfo:function(){return{type:"profile"}}}});e.result.then(function(c){c&&b.manpowerService.deleteProfile(d,b.session.user).then(function(){a.$broadcast("profiles_changed")})})},b.archive=function(c){console.log("archiving employee with id : ",c),b.manpowerService.archiveProfile(c,b.session.user).then(function(c){if(console.log("archive profile done",c),"success"===c.result)return void a.$broadcast("profiles_changed");switch(c.status){case 422:console.error("422: ",c.data),b.launchErrorModal(c.data);break;case 401:a.$broadcast("not_authenticated")}})},b.unarchive=function(c){console.log("unarchiving employee with id : ",c),b.manpowerService.unarchiveProfile(c,b.session.user).then(function(c){if(console.log("unarchive profile done",c),"success"===c.result)return void a.$broadcast("profiles_changed");switch(c.status){case 422:console.error("422: ",c.data),b.launchErrorModal(c.data);break;case 401:a.$broadcast("not_authenticated")}})}}]).directive("manpowerProfiles",function(){return{templateUrl:"views/profiles.html"}}),angular.module("oasApp").controller("AllocationCtrl",["$scope",function(a){a.viewtype="normal",a.isView=function(b){return b===a.viewtype}}]).directive("manpowerAllocation",function(){return{templateUrl:"views/allocation.html"}}),angular.module("oasApp").controller("SalaryCtrl",["$rootScope","$scope","SalaryService",function(a,b){b.salaryDate=b.today,b.$watch("salaryDate",function(c,d){if(console.log("salaryDate changed : ",c,d),""===c)return void(c=d);if("object"==typeof c){var e=new Date(c),f=e.getDate(),g=e.getMonth()+1,h=e.getFullYear();10>g&&(g="0"+g),10>f&&(f="0"+f),c=h+"-"+g+"-"+f}a.$broadcast("update_salary",b.salaryDate)}),b.viewtype="monthly",b.salarymode="live",b.editMode=!1,b.datepickers={salaryDate:!1},b.dateOptions={showWeeks:!1,startingDay:0,formatDay:"dd",formatMonth:"MMMM",formatYear:"yy",minDate:"2014-01-01"},b.open=function(a){console.log(b.settingsService.settings),a.preventDefault(),a.stopPropagation();var c={salaryDate:!1};angular.copy(c,b.datepickers),b.datepickers[a.target.name]=!0},b.shiftDay=function(a){var c,d,e,f=typeof b.salaryDate,g=b.salaryDate,h=new Date(g);if("string"===f){var i=g.split("-");e=parseInt(i[0]),d=parseInt(i[1])-1,c=parseInt(i[2]),h=new Date(e,d,c)}h.setDate(h.getDate()+a),c=h.getDate(),d=h.getMonth()+1,e=h.getFullYear(),10>d&&(d="0"+d),10>c&&(c="0"+c),b.salaryDate=e+"-"+d+"-"+c},b.shiftMonth=function(a){var c,d,e,f=typeof b.salaryDate,g=b.salaryDate,h=new Date(g);if("string"===f){var i=g.split("-");e=parseInt(i[0]),d=parseInt(i[1])-1,c=parseInt(i[2]),h=new Date(e,d,c)}h.setMonth(h.getMonth()+a),c=h.getDate(),d=h.getMonth()+1,e=h.getFullYear(),10>d&&(d="0"+d),10>c&&(c="0"+c),b.salaryDate=e+"-"+d+"-"+c}}]).directive("manpowerSalary",function(){return{templateUrl:"views/salary.html"}}),angular.module("oasApp").controller("AttendanceCtrl",["$rootScope","$scope","$modal","AttendanceService","SettingsService","ProjectsService",function(a,b,c){b.attendanceDate=b.today,b.$watch("attendanceDate",function(c,d){if(console.log("attendanceDate changed : ",c,d),""===c)return void(c=d);if("object"==typeof c){var e=new Date(c),f=e.getDate(),g=e.getMonth()+1,h=e.getFullYear();10>g&&(g="0"+g),10>f&&(f="0"+f),c=h+"-"+g+"-"+f}a.$broadcast("update_attendance",b.attendanceDate)}),b.$on("update_attendance",function(){b.selectedEntryId=-1}),b.createEntry=function(a,d,e){var f=c.open({templateUrl:"views/modal/createentry.html",controller:"CreateentryCtrl",backdrop:"static",backdropClass:"backdrop-oas",windowClass:"modal-oas vertical-center attendanceentry-modal",resolve:{modalInfo:function(){return{newEntryDate:b.attendanceDate,employeeId:a,startTime:b.settingsService.settings.work_start_at,projects:b.projectsService.projects}}}});f.result.then(function(a){b.confirmCreateEntry(a,d,e)})},b.confirmCreateEntry=function(d,e,f){var g=c.open({templateUrl:"views/modal/createentryconfirmation.html",controller:"CreateentryconfirmationCtrl",backdrop:"static",backdropClass:"backdrop-oas",size:"sm",windowClass:"modal-oas vertical-center createentryconfirmation-modal",resolve:{modalInfo:function(){return{type:d.type_code,name:e,avatar:f}}}});g.result.then(function(c){c&&b.attendanceService.createAttendance(d,d.employeeId,b.session.user).then(function(c){if(console.log("create attendance done",c),"success"===c.result)return console.log("Success response : ",c),void a.$broadcast("update_attendance",b.attendanceDate);switch(c.status){case 422:console.error("422: ",c.data),b.launchErrorModal(c.data);break;case 401:a.$broadcast("not_authenticated")}})})},b.selectedEntryId=-1,b.defaultAvatarPath="images/manpower/avatar.png",b.setSelectedEntryId=function(a){b.selectedEntryId===a&&(a=-1),b.selectedEntryId=a},b.deleteEntryConfirmation=function(d){var e=c.open({templateUrl:"views/modal/deleteconfirmation.html",controller:"DeleteconfirmationCtrl",backdrop:"static",backdropClass:"backdrop-oas",size:"sm",windowClass:"modal-oas vertical-center deleteconfirmation-modal",resolve:{modalInfo:function(){return{type:"entry"}}}});e.result.then(function(c){c&&b.attendanceService.deleteAttendance(d,b.session.user).then(function(){a.$broadcast("update_attendance",b.attendanceDate)})})},b.editEntry=function(d){var e=c.open({templateUrl:"views/modal/editentry.html",controller:"EditentryCtrl",backdrop:"static",backdropClass:"backdrop-oas",windowClass:"modal-oas vertical-center attendanceentry-modal",resolve:{modalInfo:function(){return{entry:d,entryDate:b.attendanceDate,startTime:b.settingsService.settings.work_start_at,projects:b.projectsService.projects}}}});e.result.then(function(c){b.attendanceService.updateAttendance(c,b.session.user).then(function(){a.$broadcast("update_attendance",b.attendanceDate)})})},b.showEntryDetails=function(a,b){c.open({templateUrl:"views/modal/attendancelocationmodal.html",controller:"AttendancelocationmodalCtrl",backdrop:"static",backdropClass:"backdrop-oas",windowClass:"modal-oas vertical-center attendanceentry-modal",resolve:{modalInfo:function(){return{entry:a,type:b}}}})},b.selectedProject="All projects",b.chooseProject=function(c){b.selectedProject!==c&&a.$broadcast("project_selected_changed"),b.selectedProject=c},b.datepickers={attendanceDate:!1},b.dateOptions={showWeeks:!1,startingDay:0,formatDay:"dd",formatMonth:"MMMM",formatYear:"yy",minDate:"2014-01-01"},b.open=function(a){console.log(b.settingsService.settings),a.preventDefault(),a.stopPropagation();var c={attendanceDate:!1};angular.copy(c,b.datepickers),b.datepickers[a.target.name]=!0},b.shiftDay=function(a){console.log("shiftDay",a);var c,d,e,f=typeof b.attendanceDate,g=b.attendanceDate,h=new Date(g);if("string"===f){var i=g.split("-");e=parseInt(i[0]),d=parseInt(i[1])-1,c=parseInt(i[2]),h=new Date(e,d,c)}h.setDate(h.getDate()+a),c=h.getDate(),d=h.getMonth()+1,e=h.getFullYear(),10>d&&(d="0"+d),10>c&&(c="0"+c),b.attendanceDate=e+"-"+d+"-"+c}}]).directive("manpowerAttendance",function(){return{templateUrl:"views/attendance.html"}}),angular.module("oasApp").controller("SettingsCtrl",["$scope",function(a){a.currentPanel="general",a.setPanel=function(b){a.currentPanel=b}}]).directive("settingsTab",function(){return{templateUrl:"views/settings.html"}}),angular.module("oasApp").controller("GeneralsettingsCtrl",["$rootScope","$scope","SettingsService",function(a,b,c){b.settingsService=c,b.settingsService.settings=c.settings,a.$broadcast("settings_changed"),b.save=function(){console.log("Updating settings"),b.settingsService.updateSettings(b.settingsService.settings,b.session.user).then(function(c){if("success"===c.result)return void a.$broadcast("settings_changed");switch(c.status){case 422:console.error("422: ",c.data),b.launchErrorModal(c.data);break;case 401:a.$broadcast("not_authenticated")}})}}]).directive("settingsGeneral",function(){return{templateUrl:"views/generalsettings.html"}}),angular.module("oasApp").constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}),angular.module("oasApp").constant("USER_ROLES",{all:"*",admin:"admin",user:"user"}),angular.module("oasApp").factory("AuthService",["$http","$cookies","Session","HTTP_PARAMS",function(a,b,c,d){var e={};return e.login=function(b){return console.log("In authservice login"),a({method:"POST",url:d.urlPrefix+"sessions",headers:{"X-APP-SECRET":d.appSecret},params:{email:b.email,password:b.password}}).then(function(a){return console.log("res data: ",a.data),a.data})},e.userInfo=function(b,c){return console.log("In authservice userinfo"),a({method:"GET",url:d.urlPrefix+"sessions",headers:{"X-USER-ID":b,"X-USER-TOKEN":c}}).then(function(a){return a.data})},e.isAuthenticated=function(){return!!b.authToken},e.isAuthorized=function(a){return angular.isArray(a)||(a=[a]),e.isAuthenticated()&&-1!==a.indexOf(c.userRole)},e}]),angular.module("oasApp").factory("ManpowerService",["$http","AuthService","HTTP_PARAMS",function(a,b,c){var d=function(a){var b={};return b.result="success",b.data=a.data,b},e=function(a){var b={};return b.result="failure",b.status=a.status,b.data=a.data.errors,b},f=function(a){angular.copy(a,g.profiles)},g={};return g.profiles=[],g.profilesArchived=[],g.getProfiles=function(d){return console.log("In manpowerService profiles"),void 0===d&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"employees",headers:{"X-USER-ID":d.id,"X-USER-TOKEN":d.authToken},params:{page:1}}).then(function(a){f(a.data.employees)})},g.getProfilesArchived=function(b){return console.log("In manpowerService getProfilesArchived"),a({method:"GET",url:c.urlPrefix+"employees/archives",headers:{"X-USER-ID":b.id,"X-USER-TOKEN":b.authToken},params:{page:1}}).then(function(a){angular.copy(a.data.employees,g.profilesArchived)})},g.createProfile=function(b,f){var g=JSON.parse(angular.toJson(b));return console.log("In manpowerService.createProfile",b),a({method:"POST",url:c.urlPrefix+"employees/",headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken},params:g}).then(d,e)},g.updateProfile=function(b,f){console.log("In manpowerService.updateProfile",b,f);var g=JSON.parse(angular.toJson(b));return a({method:"PUT",url:c.urlPrefix+"employees/"+b.id,headers:{"Content-Type":void 0,"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken},params:g}).then(d,e)},g.archiveProfile=function(b,f){return console.log("In manpowerService.archiveProfile"),a({method:"POST",url:c.urlPrefix+"employees/"+b+"/archive",headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken}}).then(d,e)},g.unarchiveProfile=function(b,f){return console.log("In manpowerService.unarchiveProfile"),a({method:"POST",url:c.urlPrefix+"employees/"+b+"/unarchive",headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken}}).then(d,e)},g.deleteProfile=function(b,f){return console.log("In manpowerService.deleteProfile"),a({method:"DELETE",url:c.urlPrefix+"employees/"+b,headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken}}).then(d,e)},g}]),angular.module("oasApp").factory("SettingsService",["$rootScope","$http","AuthService","HTTP_PARAMS",function(a,b,c,d){var e=function(a){var b={};return b.result="success",b.data=a.data,b},f=function(a){var b={};return b.result="failure",b.status=a.status,b.data=a.data.errors,b},g={};return g.settings={},g.getSettings=function(e){return console.log("In settingsService.getSettings"),void 0===e&&c.retrieveSession(),b({method:"GET",url:d.urlPrefix+"settings",headers:{"X-USER-ID":e.id,"X-USER-TOKEN":e.authToken}}).then(function(b){angular.copy(b.data,g.settings),a.$broadcast("settings_updated")})},g.updateSettings=function(a,g){return console.log("In settingsService.updateSettings"),void 0===g&&c.retrieveSession(),b({method:"POST",url:d.urlPrefix+"settings",headers:{"X-USER-ID":g.id,"X-USER-TOKEN":g.authToken},params:a}).then(e,f)},g}]),angular.module("oasApp").controller("PersonalsettingsCtrl",["$scope",function(a){a.name="Employee Name",a.position="Employee Position",a.email="Employee@oas.com",a.password="1234",a.newpassword="",a.confirmpassword=""}]).directive("settingsPersonal",function(){return{templateUrl:"views/personalsettings.html"}}),angular.module("oasApp").controller("AccountsettingsCtrl",["$scope",function(a){a.accounts=[{name:"Employee Name 1",position:"Position 1",email:"1@oas.com",password:"123456",mobilename:"Employee Name",mobilepassword:"123456"},{name:"Employee Name 2",position:"Position 2",email:"2@oas.com",password:"123456",mobilename:"Employee Name",mobilepassword:"123456"},{name:"Employee Name 3",position:"Position 3",email:"3@oas.com",password:"123456",mobilename:"Employee Name",mobilepassword:"123456"}]}]).directive("settingsAccounts",function(){return{templateUrl:"views/accountsettings.html"}}),angular.module("oasApp").controller("ForgotpasswordCtrl",["$scope","$modalInstance",function(a,b){a.email="",a.ok=function(){b.close("")},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("oasApp").controller("GeneralsettingsmodalCtrl",["$rootScope","$scope","$modalInstance","SettingsService",function(a,b,c,d){b.settingsService=d,b.settingsService.settings=d.settings,b.settingsService.getSettings(b.session.user),b.save=function(){console.log("Updating settings"),b.settingsService.updateSettings(b.settingsService.settings,b.session.user).then(function(d){if(console.log("update settings done",d),c.close(""),"success"===d.result)return a.$broadcast("settings_changed"),void c.close("");switch(d.status){case 422:console.error("422: ",d.data),b.launchErrorModal(d.data);break;case 401:a.$broadcast("not_authenticated")}})},b.cancel=function(){c.dismiss("cancel")}}]),angular.module("oasApp").controller("DeleteconfirmationCtrl",["$scope","$modalInstance","modalInfo",function(a,b,c){a.response=!1,a.deletetype=c.type,a.confirm=function(){b.close(!0)},a.cancel=function(){b.dismiss("cancel")}}]).directive("deleteconfirmation",function(){return{templateUrl:"views/modal/deleteconfirmation.html"}}),angular.module("oasApp").directive("matchwith",function(){return{require:"ngModel",scope:{otherValue:"=matchwith"},link:function(a,b,c,d){d.$validators.matchwith=function(b){return b==a.otherValue.$viewValue},a.$watch(a.otherValue,function(){d.$validate()})}}}),angular.module("oasApp").controller("AccountcardCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]).directive("accountCard",function(){return{templateUrl:"views/accountcard.html"}}),angular.module("oasApp").controller("ProfilecardCtrl",["$rootScope","$scope","$filter","$timeout",function(a,b,c,d){b.foreignOptions=[{id:0,name:"Local"},{id:1,name:"Foreigner"}],b.foreignOptionSelected=$.grep(b.foreignOptions,function(a){return a.id===b.employee.foreign})[0].name,b.positionOptions=["Supervisor","Asst Supervisor","Worker"],b.positionOptionSelected=$.grep(b.positionOptions,function(a){return a===b.employee.position})[0],b.editMode=!1,b.datepickers={date_of_birth:!1,joined_date:!1,application_date:!1,wp_expired_at:!1,passport_expired_at:!1,commence_date:!1},b.dateOptions={showWeeks:!1,startingDay:0,formatDay:"dd",formatMonth:"MMMM",formatYear:"yy",minDate:"2014-01-01"},b.open=function(a){a.preventDefault(),a.stopPropagation();var c={date_of_birth:!1,joined_date:!1,application_date:!1,wp_expired_at:!1,passport_expired_at:!1,commence_date:!1};angular.copy(c,b.datepickers),b.datepickers[a.target.name]=!0},b.toggleEdit=function(){b.editMode=!b.editMode},b.saveChanges=function(c){return b.profileForm.$valid?(c.avatar===c.avatar_medium_url&&(c.avatar=null),void b.manpowerService.updateProfile(c,b.session.user).then(function(c){if(console.log("update profile done",c),"success"===c.result)return b.toggleEdit(),void a.$broadcast("profiles_changed");switch(c.status){case 500:console.error("500: ",c.data),b.launchErrorModal(["Internal server error"]);break;case 422:console.error("422: ",c.data),b.launchErrorModal(c.data);break;case 401:a.$broadcast("not_authenticated")}})):void b.launchErrorModal(["Form invalid. Please check before submission."])},b.fileReaderSupported=null!=window.FileReader&&(null==window.FileAPI||0!=FileAPI.html5),b.$watch("files",function(a){if(b.formUpload=!1,null!=a)for(var c=0;c<a.length;c++)b.errorMsg=null,function(a){b.generateThumb(a)}(a[c])}),b.generateThumb=function(a){null!=a&&b.fileReaderSupported&&a.type.indexOf("image")>-1&&d(function(){var c=new FileReader;c.readAsDataURL(a),c.onload=function(c){d(function(){b.employee.avatar=a,a.dataUrl=c.target.result})}})}}]).directive("profileCard",function(){return{templateUrl:"views/profilecard.html"}}),angular.module("oasApp").constant("HTTP_PARAMS",{urlPrefix:"http://54.169.2.173/v1/",appSecret:"992bb2ecb4aca0986c898f19801731d1297220bb857961a0bd2661d5d327c4a2"}),angular.module("oasApp").factory("Session",["$cookies","$cookieStore",function(a,b){var c={};return c.user={},c.create=function(b){var d={id:b.id,name:b.name,avatar:b.avatar_medium_url,avatarThumb:b.avatar_thumb_url,authToken:b.authentication_token};a.user=angular.toJson(d),a.authToken=b.authentication_token,angular.copy(d,c.user)},c.destroy=function(){angular.copy({},c.user),b.remove("userId"),b.remove("user"),b.remove("authToken")},c.restoreSession=function(){var b=angular.fromJson(a.user);angular.copy(b,c.user)},c}]),angular.module("oasApp").controller("SalarycarddailyCtrl",["$scope",function(){}]).directive("salaryCardDaily",function(){return{templateUrl:"views/salarycarddaily.html"}}),angular.module("oasApp").controller("SalarycardmonthlyCtrl",["$scope",function(a){a.editMode=!1,a.sixteenDays=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"],a.toggleEdit=function(){a.editMode=!a.editMode},a.overtimeRecords=[],a.projectNames=[];a.$watch("salaryDate",function(b){console.log("newSalaryDate: ",b);for(var c=b.substring(0,4),d=b.substring(5,7),e=new Date(c,d,0).getDate(),f=[],g=0,h=e-16;h>g;g++)f.push(g+17);a.remainingDaysInMonth=f})}]).directive("salaryCardMonthly",function(){return{templateUrl:"views/salarycardmonthly.html"}}),angular.module("oasApp").controller("alphabetListCtrl",["$scope",function(a){a.active="A"}]).directive("alphabetList",function(){return{templateUrl:"views/alphabetlist.html",restrict:"EA"}}),angular.module("oasApp").filter("nulldash",function(){return function(a){return null==a||void 0===a?"-":a}}),angular.module("oasApp").controller("NewprofileCtrl",["$rootScope","$scope","$modal",function(a,b){var c=function(){b.newEmployee={name:"New Employee",avatar:null,avatar_medium_url:null,login_id:null,passcode:null,dormitory_address:null,nationality:null,foreign:0,date_of_birth:null,position:"Worker",joined_date:null,work_permit_number:null,application_date:null,commence_date:null,employment_period:null,fin:null,wp_expired_at:null,passport:null,passport_expired_at:null,skill_passed:null,passed_date:null,soc_details:null,soc_expired_at:null,additional_qualification:null,others:null,basic_rate:null,skill_rate:null,overtime_rate:null,levy_rate:null,meal_allowance:null,employee_files:null}};b.$watch("newProfile",function(){c()}),b.foreignOptions=[{id:0,name:"Local"},{id:1,name:"Foreigner"}],b.positionOptions=["Supervisor","Asst Supervisor","Worker"],b.datepickers={date_of_birth:!1,joined_date:!1,application_date:!1,wp_expired_at:!1,passport_expired_at:!1,commence_date:!1},b.dateOptions={showWeeks:!1,startingDay:0,formatDay:"dd",formatMonth:"MMMM",formatYear:"yy",minDate:"2014-01-01"},b.open=function(a){a.preventDefault(),a.stopPropagation();var c={date_of_birth:!1,joined_date:!1,application_date:!1,wp_expired_at:!1,passport_expired_at:!1,commence_date:!1};angular.copy(c,b.datepickers),b.datepickers[a.target.name]=!0},b.createEmployee=function(){if(!b.profileForm.$valid)return void b.launchErrorModal(["Form invalid. Please check before submission."]);var d=b.newEmployee;b.manpowerService.createProfile(d,b.session.user).then(function(d){if(console.log("create profile done",d),"success"===d.result)return c(),void a.$broadcast("profile_created");switch(d.status){case 422:console.error("422: ",d.data),b.launchErrorModal(d.data);break;case 401:a.$broadcast("not_authenticated")}})}}]).directive("newprofileCard",function(){return{templateUrl:"views/newprofilecard.html"}}),angular.module("oasApp").filter("isforeigner",function(){return function(a){return 1===a?"Foreigner":"Local"}}),angular.module("oasApp").factory("AttendanceService",["$http","AuthService","HTTP_PARAMS",function(a,b,c){var d=function(a){var b={};return b.result="success",b.data=a.data,b},e=function(a){var b={};return b.result="failure",b.status=a.status,b.data=a.data.errors,b},f=function(a){var b=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],c=Number(a[0]+a[1]),d=b.slice(0,c),e=b.slice(c),f=e.concat(d);return f.concat([a])},g=function(a,b){console.log("formCheckoutArray : ",b);var c,d,e,f=Number(b.slice(0,2)),g=Number(b.slice(3,5)),h=60*(60*f+g)*1e3,i=a.map(function(a){return 2!==a.type_code&&3!==a.type_code&&4!==a.type_code?null===a.check_out_time?void(a.type_code=0):(c=Number(a.check_out_time.slice(11,13)),d=Number(a.check_out_time.slice(14,16)),e=60*(60*c+d)*1e3,h>e&&(e+=864e5),e):void 0});return i.unshift(h),i.sort(function(a,b){return a-b}),i},h=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=0,q=c.split(":"),r=Number(q[0]),s=Number(q[1]),t=60*(60*r+s)*1e3;switch(a.type_code){case 1:for(h=Number(a.check_out_time.slice(11,13)),i=Number(a.check_out_time.slice(14,16)),j=60*(60*h+i)*1e3,e=Number(a.check_in_time.slice(11,13)),f=Number(a.check_in_time.slice(14,16)),g=60*(60*e+f)*1e3,t>g&&(g+=864e5),t>j&&(j+=864e5),k=(j-g)/864e3,p=b.length;p>0;)p--,b[p]<=g&&(l=(g-b[p])/864e3,p=0);n=1===a.incomplete?"attendance-entry red-bar":"attendance-entry blue-bar";break;case 5:for(h=Number(a.check_out_time.slice(11,13)),i=Number(a.check_out_time.slice(14,16)),j=60*(60*h+i)*1e3,e=Number(a.check_in_time.slice(11,13)),f=Number(a.check_in_time.slice(14,16)),g=60*(60*e+f)*1e3,t>g&&(g+=864e5),t>j&&(j+=864e5),k=(j-g)/864e3,p=b.length;p>0;)p--,b[p]<=g&&(l=(g-b[p])/864e3,p=0);n="attendance-entry blue-bar";break;case 2:k=100,l=0,n="attendance-entry green-bar";break;case 3:k=100,l=0,n="attendance-entry green-bar";break;case 4:k=100,l=0,n="attendance-entry purple-bar";break;default:for(e=Number(a.check_in_time.slice(11,13)),f=Number(a.check_in_time.slice(14,16)),g=60*(60*e+f)*1e3,d=864e5-g+b[0],k=d/864e3,p=b.length;p>0;)p--,b[p]<=g&&(l=(g-b[p])/864e3,p=0);n="attendance-entry red-bar"}return m=(g-b[0])/864e3,o="attendance-info left",m>50&&(m-=45,o="attendance-info right"),k+="%",l+="%",m+="%",{entryWidth:k,leftMargin:l,wallMargin:m,infoClasses:o,classes:n}},i=function(a){var b=a.check_in_start_at;a.timeline=f(b),a.employees.map(function(a){var c=a.attendances,d=g(c,b);return c.map(function(a){return a.styles=h(a,d,b),a}),a.checkoutArr=d,a}),console.log("data : ",a),angular.copy(a,j.attendances)},j={attendances:[]};return j.getAttendances=function(d,e){return console.log("In attendanceService.getAttendances",d),void 0===e&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"attendances/"+d+"/?page=1",headers:{"X-USER-ID":e.id,"X-USER-TOKEN":e.authToken},params:{page:1}}).then(function(a){i(a.data)})},j.createAttendance=function(f,g,h){return console.log("In attendanceService.createAttendance"),void 0===h&&b.retrieveSession(),a({method:"POST",url:c.urlPrefix+"employees/"+g+"/attendances",headers:{"X-USER-ID":h.id,"X-USER-TOKEN":h.authToken},params:f}).then(d,e)},j.updateAttendance=function(b,f){return console.log("In attendanceService.updateAttendance"),a({method:"PUT",url:c.urlPrefix+"attendances/"+b.id,headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken},params:b}).then(d,e)},j.deleteAttendance=function(b,f){return console.log("In attendanceService.deleteAttendance"),a({method:"DELETE",url:c.urlPrefix+"attendances/"+b,headers:{"X-USER-ID":f.id,"X-USER-TOKEN":f.authToken}}).then(d,e)},j.getEmployeeAttendance=function(f,g){return console.log("In attendanceService getEmployeeAttendance"),void 0===g&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"employees/"+f+"/attendances",headers:{"X-USER-ID":g.id,"X-USER-TOKEN":g.authToken},params:{page:1}}).then(d,e)},j}]),angular.module("oasApp").controller("AttendancecardCtrl",["$rootScope","$scope",function(a,b){b.entries=b.employee.attendances.reverse()}]).directive("attendanceCard",function(){return{templateUrl:"views/attendancecard.html"}}),angular.module("oasApp").controller("AttendanceentryCtrl",["$scope",function(a){a.$watch("selectedEntryId",function(){a.active=a.isEquals(a.selectedEntryId,a.entry.id)?"active":""}),a.$watch("selectedProject",function(b){a.setSelectedEntryId(-1),a.disabled=a.isEquals(b,a.entry.project.name)||"All projects"===b?"":"disabled"})}]).directive("attendanceEntry",function(){return{templateUrl:"views/attendanceentry.html"}}),angular.module("oasApp").controller("CreateentryCtrl",["$scope","$filter","$modalInstance","modalInfo",function(a,b,c,d){console.log("modalinfo",d);var e=["PROJECT","LEAVE","MEDICAL LEAVE","PUBLIC HOLIDAY"];a.ok=function(){var b=e.indexOf(a.selectedEntryType)+1,f=a.selectedProjectId,g=new Date(d.newEntryDate),h={},i=d.startTime,j=i.split(":"),k=Number(j[0]),l=Number(j[1]),m=g.setHours(k,l,0,0);if(a.errorMessage="",""===b||""===f)return void(a.errorMessage="All fields are required.");if(1===b&&(""===n||""===s))return void(a.errorMessage="All fields are required.");if(h.project_id=f,h.type_code=b,h.employeeId=d.employeeId,1===b){var g=new Date(d.newEntryDate),n=a.checkinTime,o=n.split(":"),p=Number(o[0]),q=Number(o[1]),r=g.setHours(p,q,0,0),s=a.checkoutTime,t=s.split(":"),u=Number(t[0]),v=Number(t[1]),w=g.setHours(u,v,0,0);m>r&&(r+=864e5),m>w&&(w+=864e5);var x=new Date(r),y=new Date(w);h.check_in_time=x.toISOString(),h.check_out_time=y.toISOString()}(2===b||3===b||4===b)&&(g.setHours(k,l,0,0),h.check_in_time=g.toISOString(),h.remark=a.entryRemarks),console.log("newEntryParams : ",h),c.close(h)},a.cancel=function(){c.dismiss("cancel")},a.isSelectedEntryType=function(b){return e.indexOf(a.selectedEntryType)===b-1},a.chooseEntryType=function(b){a.selectedEntryType=e[b-1]},a.chooseProject=function(c){var d={};a.selectedProjectId=c,d=b("filter")(a.projects,{id:c})[0],a.selectedProjectName=d.name,a.selectedProjectAddress=d.address},a.projects=d.projects,a.selectedEntryType="",a.selectedProjectId="",a.selectedProjectName="",a.selectedProjectAddress="",a.entryRemarks="",a.errorMessage="",a.status={isopen:!1},a.toggleDropdown=function(b){b.preventDefault(),b.stopPropagation(),a.status.isopen=!a.status.isopen}}]),angular.module("oasApp").factory("ProjectsService",["$http","AuthService","HTTP_PARAMS",function(a,b,c){var d={};return d.projects=[],d.getProjects=function(e){return console.log("In projectsService.getProjects"),void 0===e&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"projects",headers:{"X-USER-ID":e.id,"X-USER-TOKEN":e.authToken}}).then(function(a){angular.copy(a.data.projects,d.projects)})},d}]),angular.module("oasApp").controller("CreateentryconfirmationCtrl",["$scope","$modalInstance","modalInfo",function(a,b,c){a.modalInfo=c,a.isEntryType=function(a){return c.type===a
},a.confirm=function(){b.close(!0)},a.cancel=function(){b.dismiss("cancel")}}]).directive("createentryconfirmation",function(){return{templateUrl:"views/modal/createentryconfirmation.html"}}),angular.module("oasApp").controller("AttendanceinfoCtrl",["$rootScope","$scope",function(a,b){b.entryIncomplete=1===b.entry.incomplete,b.confirmEntry=function(){console.log("Confirm entry"),b.entry.incomplete=0,b.attendanceService.updateAttendance(b.entry,b.session.user).then(function(){a.$broadcast("update_attendance",b.attendanceDate)})}}]).directive("attendanceInfo",function(){return{templateUrl:"views/attendanceinfo.html"}}),angular.module("oasApp").controller("EditentryCtrl",["$scope","$filter","$modalInstance","modalInfo",function(a,b,c,d){console.log("modalinfo",d);var e=["PROJECT","LEAVE","MEDICAL LEAVE","PUBLIC HOLIDAY"];a.ok=function(){var b=e.indexOf(a.selectedEntryType)+1,f=a.selectedProjectId,g=new Date(d.entryDate),h={},i=d.startTime,j=i.split(":"),k=Number(j[0]),l=Number(j[1]),m=g.setHours(k,l,0,0);if(a.errorMessage="",""===b||""===f)return void(a.errorMessage="All fields are required.");if(1===b&&(""===n||""===s))return void(a.errorMessage="All fields are required.");if(h.project_id=f,h.type_code=b,h.id=d.entry.id,1===b){var g=new Date(d.entryDate),n=a.checkinTime,o=n.split(":"),p=Number(o[0]),q=Number(o[1]),r=g.setHours(p,q,0,0),s=a.checkoutTime,t=s.split(":"),u=Number(t[0]),v=Number(t[1]),w=g.setHours(u,v,0,0);m>r&&(r+=864e5),m>w&&(w+=864e5);var x=new Date(r),y=new Date(w);h.check_in_time=x.toISOString(),h.check_out_time=y.toISOString()}(2===b||3===b||4===b)&&(g.setHours(k,l,0,0),h.check_in_time=g.toISOString(),h.remark=a.entryRemarks),console.log("edit entryParams : ",h),c.close(h)},a.cancel=function(){c.dismiss("cancel")},a.isSelectedEntryType=function(b){return e.indexOf(a.selectedEntryType)===b-1},a.chooseEntryType=function(b){a.selectedEntryType=e[b-1]},a.chooseProject=function(c){var d={};a.selectedProjectId=c,d=b("filter")(a.projects,{id:c})[0],a.selectedProjectName=d.name,a.selectedProjectAddress=d.address},a.projects=d.projects,a.selectedEntryType="",a.selectedProjectId="",a.selectedProjectName="",a.selectedProjectAddress="",a.entryRemarks="",a.errorMessage="",a.checkinTime="",a.checkoutTime="",a.chooseProject(d.entry.project.id),a.chooseEntryType(d.entry.type_code),a.checkinTime=b("date")(d.entry.check_in_time,"HH:mm"),a.checkoutTime=b("date")(d.entry.check_out_time,"HH:mm"),a.status={isopen:!1},a.toggleDropdown=function(b){b.preventDefault(),b.stopPropagation(),a.status.isopen=!a.status.isopen}}]),angular.module("oasApp").factory("SalaryService",["$http","AuthService","HTTP_PARAMS",function(a,b,c){var d=function(a){var b={};return b.result="success",b.data=a.data,b},e=function(a){var b={};return b.result="failure",b.status=a.status,b.data=a.data.errors,b},f=function(a){angular.copy(a,g.salary.daily)},g={};return g.salary={daily:[],monthly:[]},g.getDailySalary=function(d,e){return console.log("In salaryService.getDailySalary",d),void 0===e&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"daily_salaries/",headers:{"X-USER-ID":e.id,"X-USER-TOKEN":e.authToken},params:{date:d,page:1}}).then(function(a){f(a.data.employees)})},g.createDailyCost=function(f,g,h){return console.log("In salaryService.createDailyCost"),void 0===h&&b.retrieveSession(),a({method:"POST",url:c.urlPrefix+"employees/"+g+"/daily_costs",headers:{"X-USER-ID":h.id,"X-USER-TOKEN":h.authToken},params:f}).then(d,e)},g.updateDailyCost=function(f,g,h){return console.log("In salaryService.updateDailyCost"),void 0===h&&b.retrieveSession(),a({method:"POST",url:c.urlPrefix+"daily_costs/"+g,headers:{"X-USER-ID":h.id,"X-USER-TOKEN":h.authToken},params:f}).then(d,e)},g.getMonthlySalary=function(d,e){return console.log("In salaryService.getMonthlySalary",d),void 0===e&&b.retrieveSession(),a({method:"GET",url:c.urlPrefix+"monthly_salaries/",headers:{"X-USER-ID":e.id,"X-USER-TOKEN":e.authToken},params:{month:d,page:1}}).then(function(a){angular.copy(a.data.employees,g.salary.monthly)})},g}]),angular.module("oasApp").filter("nullzero",function(){return function(a){return null==a||void 0===a?0:a}}),angular.module("oasApp").controller("ErrormodalCtrl",["$scope","$modalInstance","modalInfo",function(a,b,c){a.errors=c.errors,a.cancel=function(){b.dismiss("cancel")}}]).directive("errormodal",function(){return{templateUrl:"views/modal/errormodal.html"}}),angular.module("oasApp").controller("AttendancecalendarmodalCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("oasApp").controller("AttendancelocationmodalCtrl",["$scope","$modalInstance","modalInfo",function(a,b,c){a.entry=c.entry,a.isCheckin="checkin"===c.type,a.cancel=function(){b.dismiss("cancel")}}]);var CURRENCY_REGEXP=/^\d+(\.\d{1,2})?$/;angular.module("oasApp").directive("currency",function(){return{require:"ngModel",link:function(a,b,c,d){d.$validators.currency=function(a,b){return d.$isEmpty(b)?!0:CURRENCY_REGEXP.test(b)?!0:!1}}}}).directive("supervisorRequired",function(){return{require:"ngModel",link:function(a,b,c,d){d.$validators.supervisorRequired=function(a,b){var e=c.position;return"Worker"===e?!0:d.$isEmpty(b)?!1:!0}}}}).directive("earlierThan",function(){return{require:"ngModel",link:function(a,b,c,d){d.$validators.earlierThan=function(a,b){if(d.$isEmpty(b))return!0;if(!c.datelimit)return!0;var e=c.datelimit,f=Date.parse(b);return"today"===e?(e=new Date,e=Date.parse(e)):e=Date.parse(e.substring(1,20)),f>e?!1:!0}}}}).directive("laterThan",function(){return{require:"ngModel",link:function(a,b,c,d){d.$validators.laterThan=function(a,b){if(d.$isEmpty(b))return!0;if(!c.datefloor)return!0;var e=c.datefloor,f=Date.parse(b);return"today"===e?(e=new Date,e=Date.parse(e)):e=Date.parse(e.substring(1,20)),e>f?!1:!0}}}}).directive("datepickerPopup",function(){return{restrict:"EAC",require:"ngModel",link:function(a,b,c,d){d.$formatters.shift()}}});