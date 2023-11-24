import { Component, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/models/deviceType';
import { UserAgentService } from 'src/app/services/user-agent.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	constructor(private userAgentService: UserAgentService) {}

	type: DeviceType;

	ngOnInit(): void {
		this.type = this.userAgentService.getDeviceType();
	}
}
