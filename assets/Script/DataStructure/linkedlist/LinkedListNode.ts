/**
 * @description 链表节点
 * @author hongen.gao
 */
export class LinkedListNode<T> {
    public data: T;
    public next: LinkedListNode<T>;
    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}