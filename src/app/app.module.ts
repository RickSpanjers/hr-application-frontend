import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {InitComponent} from './components/init-component/init.component';
import {RouterModule} from '@angular/router';
import {TokenService} from './services/token.service';
import {HttpClientModule} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TagInputModule } from 'ngx-chips';
import {FileSelectDirective, FileUploadModule} from "ng2-file-upload";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArrivalComponent } from './components/arrival-management/arrival.component';
import { PayrollComponent } from './components/payroll-management/payroll.component';
import { AbsenceComponent } from './components/absence-management/absence.component';
import { DocumentComponent } from './components/document-management/document.component';
import { CompaniesComponent } from './components/companies-management/companies.component';
import { CompanyComponent } from './components/single-company-management/company.component';
import { RequestsComponent } from './components/requests/requests.component';
import { PermissionsComponent } from './components/permission-management/permissions.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AbsenceService } from './services/absence.service';
import { AccountService } from './services/account.service';
import { CompanyService } from './services/company.service';
import { DocumentService } from './services/document.service';
import { PayrollService } from './services/payroll.service';
import { PermissionService } from './services/permission.service';
import { RequestService } from './services/request.service';
import { UserService } from './services/user.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ModeratorAbsenceRequestComponent } from './components/moderator-absence-request/moderator-absence-request.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import {MatCheckboxModule} from '@angular/material/';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    ArrivalComponent,
    PayrollComponent,
    AbsenceComponent,
    DocumentComponent,
    CompaniesComponent,
    CompanyComponent,
    RequestsComponent,
    PermissionsComponent,
    UserManagementComponent,
    NavigationComponent,
    LogoutComponent,
    ModeratorAbsenceRequestComponent,
    AddAccountComponent,
    AddCompanyComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    BrowserModule,
    TagInputModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
    CKEditorModule,
    NgxTwitterTimelineModule,
    FileUploadModule,
    RouterModule.forRoot([
      { path : 'init/:token', component : InitComponent} ,
      { path: 'login', component : LoginComponent },
      { path: 'add-account', component : AddAccountComponent, canActivate: [AuthGuardService]  },
      { path: 'add-account/:company', component : AddAccountComponent, canActivate: [AuthGuardService]  },
      { path: 'add-company', component : AddCompanyComponent, canActivate: [AuthGuardService]  },
      { path: 'company/:company', component : CompanyComponent, canActivate: [AuthGuardService]} ,
      { path: 'absence', component : AbsenceComponent, canActivate: [AuthGuardService]  },
      { path: 'profile', component : ProfileComponent, canActivate: [AuthGuardService]  },
      { path: 'profile/:profile', component : ProfileComponent, canActivate: [AuthGuardService]  },
      { path: 'presence', component : ArrivalComponent, canActivate: [AuthGuardService]  },
      { path: 'companies', component : CompaniesComponent, canActivate: [AuthGuardService]  },
      { path: 'dashboard', component : DashboardComponent, canActivate: [AuthGuardService]  },
      { path: 'document', component : DocumentComponent, canActivate: [AuthGuardService]  },
      { path: 'payroll', component : PayrollComponent, canActivate: [AuthGuardService]  },
      { path: 'permissions', component : PermissionsComponent, canActivate: [AuthGuardService]  },
      { path: 'requests', component : RequestsComponent, canActivate: [AuthGuardService]  },
      { path: 'create-absence', component : ModeratorAbsenceRequestComponent, canActivate: [AuthGuardService]  },
      { path: 'company', component : CompanyComponent, canActivate: [AuthGuardService]  },
      { path: 'users', component : UserManagementComponent, canActivate: [AuthGuardService]  },
      { path : '**', redirectTo :  'login', pathMatch : 'full' },
      { path : '', redirectTo :  'login', pathMatch : 'full' }
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AbsenceService,
    AccountService,
    CompanyService,
    DocumentService,
    PayrollService,
    PermissionService,
    RequestService,
    UserService,
    TokenService,
    AuthService,
    AuthGuardService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  exports:[
    NavigationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
