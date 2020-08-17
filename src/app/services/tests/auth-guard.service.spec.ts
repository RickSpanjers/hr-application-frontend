import { TestBed } from '@angular/core/testing';
import { async, ComponentFixture} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { TokenService } from 'app/services/token.service';
import { HttpClient } from 'selenium-webdriver/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Token } from '@angular/compiler';
import { BaseRequestOptions } from '@angular/http';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { AbsenceComponent } from 'app/components/absence-management/absence.component';
import { AbsenceService } from '../absence.service';

import { AuthGuardService } from '../auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [AuthGuardService],
      schemas:[NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
