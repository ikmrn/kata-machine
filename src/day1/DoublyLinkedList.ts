type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }
    private debug() {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            curr = curr.next;
        }
        curr = curr as Node<T>;
        return curr;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Index cannot be greater than the length");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }
        this.length++;

        let curr = this.get_At(idx) as Node<T>;
        const node = { value: item } as Node<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = curr;
        }
    }
    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if ((curr.value === item)) {
                break;
            }
            curr = curr.next;
        }
        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        if (idx > this.length) {
            return undefined;
        }

        return this.get_At(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.get_At(idx);
        if (!node) {
            return undefined;
        }
        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = node.value;
            this.head = this.tail = undefined;
            return out;
        }
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        node.prev = node.next = undefined;
        return node.value;
    }

    private get_At(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}
