import { executeAddEventListenerOrder } from './order.js';
import { renderRows } from './renderRows.js';
import { executeInteractiveTabs } from './tabs.js';
import { renderOrders } from './renderOrders.js';
import search from './search.js';


class App {
    render() {
        executeInteractiveTabs();
        renderRows();
        executeAddEventListenerOrder();
        renderOrders();
        search();
    }
}


export default App;