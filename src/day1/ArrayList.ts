type CArray<T> = {
    [index: number]: T;
    capacity: number;
};

export default class ArrayList<T> {
    public length: number;
    private array: CArray<T>;

    constructor(capacity: number) {
        this.length = 0;
        this.array = { capacity: capacity };
    }

    prepend(item: T): void {
        if (this.array.capacity === this.length + 1) {
            this.increaseCapacityCopy();
        }
        // Shift right
        for (let i = this.length - 1; i >= 0; --i) {
            this.array[i + 1] = this.array[i];
        }
        this.array[0] = item;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        if (this.array.capacity === this.length + 1) {
            this.increaseCapacityCopy();
        }
        // Shift elements to the right starting from the end of the array
        for (let i = this.length - 1; i >= idx; --i) {
            this.array[i + 1] = this.array[i];
        }
        this.array[idx] = item;
        this.length++;
    }
    append(item: T): void {
        if (this.length == this.array.capacity) {
            this.increaseCapacityCopy();
        }
        this.array[this.length] = item;
        this.length++;
    }
    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const index = Object.values(this.array).indexOf(item);
        if (index === -1) {
            return undefined;
        }
        // Shift elements after the removed item
        for (let i = index, len = this.length - 1; i < len; ++i) {
            this.array[i] = this.array[i + 1];
        }
        this.length--;
        return item;
    }
    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }
        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        if (!this.array[idx]) {
            return undefined;
        }
        // Shift left from the index
        const item = this.array[idx];
        for (let i = idx; i < this.length - 1; ++i) {
            this.array[i] = this.array[i + 1];
        }
        this.length--;
        return item;
    }

    private increaseCapacityCopy(): void {
        const newArray: CArray<T> = {
            capacity: this.array.capacity * 2,
        };

        for (let i = 0; i < this.length; ++i) {
            newArray[i] = this.array[i];
        }

        this.array = newArray;
    }
}
