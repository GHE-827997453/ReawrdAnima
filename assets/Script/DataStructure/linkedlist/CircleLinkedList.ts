import { LinkedListNode } from "./LinkedListNode";

/**
 * @description 环状链表
 * @author hongen.gao
 */
export class CircleLinkedList<T> {
    private _size: number;
    public head: LinkedListNode<T>;
    constructor() {
        this._size = 0;
        this.head = null;
    }
    public add(data: T): void {
        const node = new LinkedListNode<T>(data);
        if (this.head == null) {
            this.head = node;
            this.head.next = this.head;
        } else {
            const cur = this.getNodeAt(this.size - 1);
            cur.next = node;
            node.next = this.head;
        }
        this._size ++;
    }
    public getNodeAt(index: number): LinkedListNode<T> {
        if (index < 0 || index > this.size - 1)  {
            return null;
        }
        let node = this.head;
        for (let i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    }
    public get size(): number {
        return this._size;
    }
}