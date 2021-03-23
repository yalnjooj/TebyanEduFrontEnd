import { TranslateConfigService } from 'src/@vex/services/translate-config.service';
import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { LayoutService } from 'src/@vex/services/layout.service';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import emojioneUK from '@iconify/icons-emojione/flag-for-flag-united-kingdom';
import emojioneSA from '@iconify/icons-emojione/flag-for-flag-saudi-arabia';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { ConfigService } from 'src/@vex/services/config.service';
import { map } from 'rxjs/operators';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icAssignmentTurnedIn from '@iconify/icons-ic/twotone-assignment-turned-in';
import icBallot from '@iconify/icons-ic/twotone-ballot';
import icDescription from '@iconify/icons-ic/twotone-description';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import { NavigationService } from 'src/@vex/services/navigation.service';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import { PopoverService } from 'src/app/custom-layout/guest/components/popover/popover.service';
import { MegaMenuComponent } from 'src/app/custom-layout/guest/components/mega-menu/mega-menu.component';
import icSearch from '@iconify/icons-ic/twotone-search';
import { ColorVariable, colorVariables } from 'src/app/custom-layout/guest/components/config-panel/color-variables';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Style, StyleService } from 'src/@vex/services/style.service';

@Component({
  selector: 'vex-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));

  icSearch = icSearch;
  icBookmarks = icBookmarks;
  emojioneUK = emojioneUK;
  emojioneSA = emojioneSA;
  icMenu = icMenu;
  icPersonAdd = icPersonAdd;
  icAssignmentTurnedIn = icAssignmentTurnedIn;
  icBallot = icBallot;
  icDescription = icDescription;
  icAssignment = icAssignment;
  icReceipt = icReceipt;
  icDoneAll = icDoneAll;
  icArrowDropDown = icArrowDropDown;

  colorVariables = {
    Blue: colorVariables.blue,
    Green: colorVariables.green,
    Purple: colorVariables.purple,
    Amber: colorVariables.amber
  };

  selectedColor;
  Style = Style;
  configs = this.configService.configs;

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private navigationService: NavigationService,
    private popoverService: PopoverService,
    private translateConfigService: TranslateConfigService,
    @Inject(DOCUMENT) private document: Document,
    private styleService: StyleService,) {

    if (localStorage.getItem('color')) {
      this.selectedColor = JSON.parse(localStorage.getItem('color'))
      this.selectColor(this.selectedColor)
    } else {
      this.selectedColor = this.colorVariables.Blue
      localStorage.setItem('color', JSON.stringify(this.colorVariables.Blue));
      this.selectColor(this.selectedColor)
    }


    

    // 0 name: "Apollo"   *
    // 1 name: "Hermes"
    // 2 name: "Ares"   
    // 3 name: "Zeus"   *
    // 4 name: "Ikaros"
    this.configService.setConfig(this.configs[0].id);

    //vex-style-light
    //vex-style-default
    //vex-style-dark
    if (!(localStorage.getItem('style'))) {
      localStorage.setItem('style', this.Style.default)
      this.styleService.setStyle(this.Style.default);
    } else {
      
      this.styleService.setStyle(localStorage.getItem('style') as Style);
    }

  }

  ngOnInit() {
  }

  selectColor(color: ColorVariable) {
    localStorage.setItem('color', JSON.stringify(color))
    this.selectedColor = color;
    if (this.document) {
      this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
      this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
    }
  }

  isSelectedColor(color: ColorVariable) {
    // color === JSON.parse(localStorage.getItem('color'))
    return false;
  }

  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement) {
    this.popoverService.open({
      content: MegaMenuComponent,
      origin,
      position: [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });
  }

  openSearch() {
    this.layoutService.openSearch();
  }

  changeLang(type: string) {
    this.translateConfigService.changeLanguage(type)
  }

  setStyles(style: string | Style) {
    if ((localStorage.getItem('style')) == style) return


    localStorage.setItem('style', style)
    this.styleService.setStyle(style as Style);
  }
}
