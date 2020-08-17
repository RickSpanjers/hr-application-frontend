import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { TokenService } from 'app/services/token.service';
import { HttpClient } from 'selenium-webdriver/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Token } from '@angular/compiler';
import { BaseRequestOptions } from '@angular/http';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { RequestsComponent } from './requests.component';

describe('RequestsComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [TokenService],
      schemas:[NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
