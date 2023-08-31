import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { DeviceType } from 'src/app/models/deviceType';
import { UserAgentService } from 'src/app/services/user-agent.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private userAgentService: UserAgentService
  ) { }

  type: DeviceType;

  ngOnInit(): void {
    this.type = this.userAgentService.getDeviceType();

    if (!this.id) return console.error('Modal ID not specified');

    document.body.appendChild(this.el.nativeElement);

    this.el.nativeElement.addEventListener('click', (e: any) => {
      if (e.target.className.includes('modal-bg')) {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.el.nativeElement.remove();
  }

  get maxWidth(): string {
    switch (this.size) {
      case 'sm':
        return '64rem';
      case 'md':
        return '68rem';
      case 'lg':
        return '72rem';
      case 'xl':
        return '76rem';
      case 'full':
        return '100%';
    }
  }

  open(): void {
    this.el.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.el.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

}