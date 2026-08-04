import { Component, inject } from '@angular/core';
import { LanguageService } from '../../info/language-info';
import {Icon} from "../icon/icon";

@Component({
  selector: 'app-icon-set',
  imports: [Icon],
  templateUrl: './icon-set.html',
  styleUrl: './icon-set.css',
})
export class IconSet {
  protected readonly personalInfo = inject(LanguageService).personalInfo;
}
