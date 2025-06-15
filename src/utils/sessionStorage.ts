
// Custom storage implementation that can switch between localStorage and sessionStorage
class CustomStorage {
  private useSessionStorage: boolean = false;

  setStorageType(useSessionStorage: boolean) {
    this.useSessionStorage = useSessionStorage;
  }

  getItem(key: string): string | null {
    const storage = this.useSessionStorage ? sessionStorage : localStorage;
    return storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    const storage = this.useSessionStorage ? sessionStorage : localStorage;
    storage.setItem(key, value);
  }

  removeItem(key: string): void {
    // Remove from both storages to ensure cleanup
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}

export const customStorage = new CustomStorage();
