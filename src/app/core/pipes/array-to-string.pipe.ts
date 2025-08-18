import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayToString"
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: { name: string }[], delimiter: string = "<br/>"): string {
    if (!Array.isArray(value) || value.length === 0) {
      return "";
    }
    return value.map(item => item.name).join(delimiter);
  }
}

@Pipe({
  name: "arrayToFirstString"
})
export class ArrayToFirstStringPipe implements PipeTransform {
  transform(value: { name: string }[]): string {
    if (!Array.isArray(value) || value.length === 0) {
      return "";
    }
    const firstItem = value[0]?.name;
    const remainingCount = value.length - 1;
    return remainingCount > 0 ? `${firstItem} +${remainingCount}` : firstItem;
  }
}
