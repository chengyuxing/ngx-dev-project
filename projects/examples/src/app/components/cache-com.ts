export abstract class CacheCom {
  private cache: { [key: string]: any } = {};

  abstract id(): string;

  addValue(key: string, value: any) {
    this.cache[key] = value;
  }

  getValue(key: string, defaultValue: any): any {
    const v = this.cache[key];
    if (v) {
      return v;
    }
    return defaultValue;
  }

  loadCache() {
    this.cache = JSON.parse(localStorage.getItem(this.id()) || '{}');
  }

  persistent() {
    localStorage.setItem(this.id(), JSON.stringify(this.cache));
  }

  clearCache() {
    localStorage.removeItem(this.id());
  }
}
