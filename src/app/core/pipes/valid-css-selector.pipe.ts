import { Injectable, Pipe, PipeTransform } from "@angular/core";

//@ts-ignore
@Injectable()
// @ts-ignore
@Pipe({
  name: "validCssSelector"
})
// @ts-ignore
export class ValidCssSelectorPipe implements PipeTransform {
  transform(value: any) {
    return value?.toString().replace(/,/g, "")?.replace(/\/|\s/g, "-").toLowerCase();
  }
}
