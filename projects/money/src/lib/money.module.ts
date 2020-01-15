import {LOCALE_ID, NgModule} from '@angular/core';
import {MoneyComponent} from './money.component';
import {FormsModule} from '@angular/forms';
import {CommonModule, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);


@NgModule({
  declarations: [MoneyComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [MoneyComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'zh-Hans'}

  ]
})
export class MoneyModule {
}
