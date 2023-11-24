import { Component, OnInit } from '@angular/core';

import { DeviceType } from 'src/app/models/deviceType';
import { UserAgentService } from 'src/app/services/user-agent.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	constructor(private userAgentService: UserAgentService) {}

	type: DeviceType;

	ngOnInit(): void {
		this.type = this.userAgentService.getDeviceType();
	}
}
