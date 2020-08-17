import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  private sub: any;
  private queryParams: Params;

  constructor(
    private _route: ActivatedRoute,
    private _authService: TokenService,
    private _router: Router) {
  }


  ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      if(!params['token'].endsWith("=")){
        this._authService.setToken(params['token']); 
      }else{
        this._authService.setTokenWithoutCharacter(params['token']); 
      }
    });

    this._router.navigate(['/client'],{queryParams: this.queryParams,});   
  }
}
