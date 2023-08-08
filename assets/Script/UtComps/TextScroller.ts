import { CircleLinkedList } from "../DataStructure/linkedlist/CircleLinkedList";

/**
 * @description 文本内容滚动组件、适用文本篇幅过长需要滚动展示的场景
 *              使用3个文本框组件, 将过长的文本内容分组填充进文本框
 * @author hongen.gao
 */
 export class TextsScroller {
    /**内容组件 需包含3个文本框组件*/
    private _comp: fgui.GComponent;
    /**当前滚动位置 */
    private _curPosY: number;
    /**文本数组索引 */
    private _page: number;
    /**文本内容数组 */
    private _contents: string[];
    /**文本框的循环链表 */
    private _linkedList: CircleLinkedList<fgui.GTextField>;
    private _cur: number;

    constructor(comp: fgui.GComponent) {
        this._comp = comp;
        this._contents = [];
        this._curPosY = 0;
        this._page = -1;
        this._linkedList = new CircleLinkedList();
        this._cur = 0;
        this.init();
    }
    public setContents(v: string[]): void {
        if (this._contents.length > 0) {
            return;
        }
        this._contents = v;
        for (let i = 0; i < 3; i++) {
            this.downfill();
        }
    }
    private init(): void {
        for (let i = 0; i < 3; i++) {
            const txt = this._comp.getChild('txt_Content' + i).asTextField;
            this._linkedList.add(txt);
        }
        this._comp.on(fgui.Event.SCROLL, this.onScroll, this);
    }
    private onScroll(): void {
        const scroller = this._comp.scrollPane;
        if (!scroller) {
            return;
        }
        const posY = scroller.posY;
        const list = this._linkedList;
        const size = list.size;
        const node = list.getNodeAt(this.cur);
        const head = node.data;
        const last = list.getNodeAt((this.cur + size - 1) % size).data;
        //下滚
        if (this._curPosY < posY) {
            if (posY > head.y + head.height && this._page < this._contents.length - 1) {
                const next = node.next.data;
                next.relations.clearAll();
                head.relations.clearAll();
                head.y = last.y + last.height;
                head.addRelation(last, fgui.RelationType.Top_Bottom);
                this.downfill();
                this._cur++;
            }
        }
        //上滚
        else if (this._curPosY > posY ) {
            if (posY + scroller.viewHeight < last.y && this._page >= size) {
                last.relations.clearAll();
                head.relations.clearAll();
                last.y = head.y - last.height;
                last.addRelation(head, fgui.RelationType.Bottom_Top);
                head.addRelation(last, fgui.RelationType.Top_Bottom);
                this.upfill();
                this._cur--;
            }
        }
        this._curPosY = scroller.posY;
    }
    /**处于最上方的组件索引 */
    private get cur(): number {
        return this._cur % this._linkedList.size;
    }
    private downfill(): void {
        this._page++;
        this._page = Math.min(this._page, this._contents.length - 1);
        const index = this._page % this._linkedList.size;
        const textfield = this._linkedList.getNodeAt(index).data;
        textfield.text = this._contents[this._page];
    }
    private upfill(): void {
        const size = this._linkedList.size;
        const page = this._page - size;
        //位于最下方的文本框
        const last = this._linkedList.getNodeAt((this.cur + size - 1) % size).data;
        last.text = this._contents[page];
        this._page--;
        this._page = Math.max(this._page, 0);
    }
}