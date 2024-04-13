type Node<T> = {
    value: T;
    next?: Node<T>;
};

class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.head;
        this.tail = this.tail;
    }
    enqueue(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = newNode;
            return;
        }
        this.tail.next = newNode;
        this.tail = newNode;
    }
    deque(): T {
        if (!this.head) {
            throw new Error("Empty queue, or head is missing.");
        }
        this.length--;
        const outValue = this.head.value;
        if (this.length === 0) {
            this.head = undefined;
            this.tail = undefined;
        } else {
            this.head = this.head.next;
        }
        // Free memory
        return outValue;
    }
}

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = new Array(graph.length).fill(-1);

    const queue = new Queue<number>();
    queue.enqueue(source);
    seen[source] = true;

    while (queue.length) {
        const curr = queue.deque();

        if (curr === needle) {
            break;
        }
        const adjacent = graph[curr];
        for (let i = 0; i < adjacent.length; ++i) {
            if (!adjacent[i]) {
                continue;
            }
            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            path[i] = curr;

            queue.enqueue(i);
        }
    }
    if (path[needle] === -1) {
        return null;
    }

    // Reverse a string
    const out: number[] = [];
    let curr = needle;
    while (curr !== -1) {
        out.push(curr);
        curr = path[curr];
    }

    return out.reverse();
}
