import {TabPanel, Widget} from "@lumino/widgets";
import "regular-table";
import "./index.css";

const NUM_ROWS = 2000;
const NUM_COLUMNS = 10;

function range(x0, x1, f) {
    return Array.from(Array(x1 - x0).keys()).map((x) => f(x + x0));
}

function dataListener(x0, y0, x1, y1) {
    console.log(range(x0, x1, (val) => [val.toString()]));
    return {
        num_rows: NUM_ROWS,
        num_columns: NUM_COLUMNS,
        column_headers: range(x0, x1, (val) => [val]),
        data: range(x0, x1, (x) => range(y0, y1, (y) => x + y)),
    };
}

class RTWidget extends Widget {
    constructor() {
        super();
        this.node.classList.add("rtwidget");
        this.table = document.createElement("regular-table");
        this.node.appendChild(this.table);
        this.table.setDataListener(dataListener);

        this.style_set = false;
    }

    onAfterAttach(msg){
        super.onAfterShow(msg);
        if(!this.style_set) {
            this.table.addStyleListener(() => {
                this.table.querySelector("table").style.width = "100%";
            });
            this.style_set = true;
        }
    }
    notifyLayout() {
        this.table.draw();
    }
}

window.addEventListener("load", () => {
    const tp = new TabPanel();
    
    tp.addWidget(new RTWidget());
    tp.addWidget(new RTWidget());

    Widget.attach(tp, document.body);
});