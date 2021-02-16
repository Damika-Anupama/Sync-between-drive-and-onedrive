import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../service/authorization.service";
// import {AuthorizationService} from "../../service/authorization.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService ) {
  }

  ngOnInit(): void {
  }
}
