import { Component, OnInit } from '@angular/core';

import { ConfigNames, ErrorCodes } from 'src/app/models/constants/properties';

import { LoginService } from "../../services/login/login.service";
import { NavService } from "../../services/nav/nav.service";
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-general-workspace',
  templateUrl: './general-workspace.component.html',
  styleUrls: ['./general-workspace.component.css']
})
export class GeneralWorkspaceComponent implements OnInit {
  private className: string = 'GeneralWorkspaceComponent';
  active = 1;
  isLoggedIn: boolean;
  isAdmin: boolean;
  openReports: boolean;
  navTabsDesign: string;
  FATALERROR: boolean;

  constructor(private loginService: LoginService, private nav: NavService,
    private core: CoreService) {}

  ngOnInit(): void {
    if (this.core.getStartUpStatus() == ErrorCodes.FATAL_ERROR) {
      this.FATALERROR = true;
    } else {
      this.initializeComponent();
    }
  }

  private initializeComponent() {
    this.loginService.subscribeUserStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.isAdmin = this.loginService.getAdminStatus();
    });
    this.nav.subscribeActiveTab().subscribe(tab => {
      this.active = tab;
    })
    this.isLoggedIn = this.loginService.getLoginStatus();
    this.isAdmin = this.loginService.getAdminStatus();
    this.checkOpenReports();
    this.checkNavTabsDesign();
  }

  private checkOpenReports(): void {
    if (this.core.getConfigValue(ConfigNames.CONF_OPEN_REPORTS) == 'Y') {
      this.openReports = true;
    } else {
      this.openReports = false;
    }
  }

  private checkNavTabsDesign(): void {
    this.navTabsDesign = this.core.getConfigValue(ConfigNames.CONF_NAVTAB_DESIGN);
  }
}
