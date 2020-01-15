import {Component, forwardRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'zm-money',
  templateUrl: './money.component.html',
  styles: [],
  providers: [
    CurrencyPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyComponent),
      multi: true
    }
  ]
})
export class MoneyComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() disabled: boolean;
  @ViewChild('asd', {static: true}) input: NgModel;
  private innerValue = '';

  constructor(private currencyPipe: CurrencyPipe) {
  }

  get _value() {
    return this.innerValue;
  }

  set _value(val) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this._onChange(val);
      this._onTouched();
    }
  }

  // 值改变的时候调用该函数，并传值
  _onChange(_: any) {
  }

  _onTouched() {
  }

  _ngModelChange(event) {
    const clearResult = this.clear(event);
    const addResult = this.add(clearResult);
    this.innerValue = addResult;
    this._onChange(clearResult);

  }

  private clear(val: string): string {
    let newVal = val.replace(/,/g, ''); // 去千分位
    newVal = newVal.replace(/¥/g, ''); // 去CN¥
    return newVal;
  }

  private add(val: string): string {
    let newVal = val.replace(/,/g, ''); // 去千分位
    newVal = newVal.replace(/¥/g, ''); // 去CN¥
    const result = this.transform(newVal);
    return result;
  }

  ngOnInit() {

  }


  ngOnDestroy() {
  }

// 这里把formControl的回调函数绑定到 _onChange
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

// 处理传入的数据值
  writeValue(obj: any): void {
    if (obj) {
      this.innerValue = this.add(obj);
    }
  }

  private transform(val: string) {
    return this.currencyPipe.transform(val, 'CNY', 'symbol-narrow');
  }

// 处理用户交互
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  // 禁用表单组件
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
