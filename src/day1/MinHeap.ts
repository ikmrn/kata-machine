export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const out = this.data[0];

        if (this.length === 1) {
            this.data = [];
            this.length--;

            return out;
        }
        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }
    private getParenIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private getLeftChildIdx(idx: number): number {
        return idx * 2 + 1;
    }

    private getRightChildIdx(idx: number): number {
        return idx * 2 + 2;
    }
    private hasLeftChild(idx: number): boolean {
        return this.getLeftChildIdx(idx) < this.length;
    }
    private hasRightChild(idx: number): boolean {
        return this.getRightChildIdx(idx) < this.length;
    }
    private swap(indexA: number, indexB: number): void {
        const temp = this.data[indexA];
        this.data[indexA] = this.data[indexB];
        this.data[indexB] = temp;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.getParenIdx(idx);
        const value = this.data[idx];
        const parentValue = this.data[parentIdx];

        if (parentValue > value) {
            this.swap(idx, parentIdx);
            this.heapifyUp(parentIdx);
        }
    }
    private heapifyDown(idx: number): void {
        while (this.hasLeftChild(idx)) {
            const lChildIdx = this.getLeftChildIdx(idx);
            const rChildIdx = this.getRightChildIdx(idx);
            const lValue = this.data[lChildIdx];
            const rValue = this.data[rChildIdx];
            let childIdx = lChildIdx;
            if (this.hasRightChild(idx) && rValue < lValue) {
                childIdx = rChildIdx;
            }
            if (this.data[idx] < this.data[childIdx]) {
                break;
            } else {
                this.swap(idx, childIdx);
            }
            idx = childIdx;
        }
    }
}
