import { environment } from '../environments/environment';

export let CONFIG = {

  baseUrls: {
    //User Management Microservice
    loginRequestUrl:  environment.serverUrl+'/authenticate/login/',
    updateProfileRequestUrl: environment.serverUrl+'/user/updateProfile/',
    changePasswordRequestUrl: environment.serverUrl+'/user/changePassword/',
    retrieveProfileRequestUrl: environment.serverUrl+'/user/profile/',
    retrieveEducationRequestUrl: environment.serverUrl+'/user/education/',
    retrieveSkillRequestUrl: environment.serverUrl+'/user/skill/',
    retrieveLanguageRequestUrl: environment.serverUrl+'/user/language/',
    retrieveExperienceRequestUrl: environment.serverUrl+'/user/experience/',
    addProfileElementRequestUrl: environment.serverUrl+'/user/profile/add',
    removeProfileElementRequestUrl: environment.serverUrl+'/user/profile/remove',
    retrieveUsersFromCompanyRequestUrl: environment.serverUrl+'/user/fromCompany/',
    retrieveArchivedUsersFromCompanyRequestUrl: environment.serverUrl+'/user/fromCompanyArchived/',
    retrieveUsersRequestUrl: environment.serverUrl+'/user/all',
    retrieveArchivedUsersRequestUrl: environment.serverUrl+'/user/all/archived',
    archiveOrRemoveAccountRequestUrl: environment.serverUrl+'/user/archiveOrDelete/',
    addAccountRequestUrl: environment.serverUrl+'/user/add/',
    updateAccountRoleRequestUrl: environment.serverUrl+'/user/updateRole/',
    retrieveDashboardRequestUrl: environment.serverUrl+'/user/retrieveDashboardData/',

    //Absence Microservice
    absenceRequestUrl: environment.serverUrl+'/absence/request/',
    cancelRequestUrl: environment.serverUrl+'/absence/cancel/',
    retrieveAbsenceRequestUrl: environment.serverUrl+'/absence/',
    retrieveOpenAbsenceRequestUrl: environment.serverUrl+'/absence/openRequests/',
    updateAbsenceStatusRequestUrl: environment.serverUrl+'/absence/status/',
    retrieveDashboardAbsenceDataUrl: environment.serverUrl+'/absence/retrieveDashboardData/',
    retrieveOpenAbsenceRequestsDashboardUrl: environment.serverUrl+'/absence/retrieveOpenAbsenceDashboardData/',

    //Attendance Microservice
    attendanceRequestUrl: environment.serverUrl+'/attendance/request/',
    retrieveAttendanceRequestUrl: environment.serverUrl+'/attendance/',


    //Company Microservice
    retrieveCompanyUrl: environment.serverUrl+'/company/',
    retrieveCompanyFunctionUrl: environment.serverUrl+'/company/function/',
    retrieveCompanyFunctionsUrl: environment.serverUrl+'/company/function/',
    retrieveCompaniesUrl: environment.serverUrl+'/company/all/',
    retrieveArchivedCompaniesUrl: environment.serverUrl+'/company/allArchived/',
    addCompanyUrl: environment.serverUrl+'/company/add/',
    archiveCompanyUrl: environment.serverUrl+'/company/archive/',
    updateCompanyUrl: environment.serverUrl+'/company/update/',
    addCompanyFunctionUrl: environment.serverUrl+'/company/function/add/',
    deleteCompanyFunctionUrl: environment.serverUrl+'/company/function/delete/',
    archiveCompanyFunctionUrl: environment.serverUrl+'/company/archive/',
    updateCompanyFunctionUrl: environment.serverUrl+'/company/function/update/',
    retrieveDashboardCompanyDataUrl: environment.serverUrl+'/company/retrieveDashboardData/',

  }
};