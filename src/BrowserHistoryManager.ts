import URLMeta from './Models/URLMeta';

export default class BrowserHistoryManager {
    public static getBrowserHistory(): URLMeta[] {
        const data = localStorage.getItem('flex://history');
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                localStorage.setItem('flex://history', '[]');
                return [];
            }
        }
        return [];
    }

    public static append(meta: URLMeta): void {
        const history = BrowserHistoryManager.getBrowserHistory();
        history.push(meta);
        localStorage.setItem('flex://history', JSON.stringify(meta));
    }
}
