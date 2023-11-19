export default { 
    setItem(key: string, val: any) { // 设置一个值
        if (typeof val === 'string') {
            window.localStorage.setItem(key, val);
        } else {
            this.setJsonItem(key, val);
        }
    },
    setJsonItem(key: string, val: any) { // 设置一个值
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    getItem(key: string): any { // 获取一个值
        let data = window.localStorage.getItem(key);
        if (data === null) {
            return data;
        } 
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },
    getStringItem(key: string): string | null { // 获取一个值
        let data = window.localStorage.getItem(key);
        return data;
    },
    clearItem(key: string) { // 删除一个值
        window.localStorage.removeItem(key);
    },
    clearAll() { // 删除所有值
        window.localStorage.clear();
    }
}
