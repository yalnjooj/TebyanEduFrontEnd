import { Component, OnInit } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import { TranslateConfigService } from 'src/@vex/services/translate-config.service';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  icCheckCircle = icCheckCircle;

  constructor(private translateConfigService: TranslateConfigService) { }

  ngOnInit() {
  }

}
