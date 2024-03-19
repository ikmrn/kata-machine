import ArrayList from "@code/ArrayList";

describe("ArrayList", () => {
    let list: ArrayList<number>;

    beforeEach(() => {
        // Initialize a new ArrayList with capacity 3 before each test
        list = new ArrayList<number>(3);
    });

    test("prepend", () => {
        list.prepend(1);
        expect(list.length).toBe(1);
        expect(list.get(0)).toBe(1);
    });

    test("insertAt", () => {
        list.insertAt(1, 0);
        expect(list.length).toBe(1);
        expect(list.get(0)).toBe(1);
    });

    test("append", () => {
        list.append(1);
        expect(list.length).toBe(1);
        expect(list.get(0)).toBe(1);
    });

    test("remove", () => {
        list.append(1);
        expect(list.remove(1)).toBe(1);
        expect(list.length).toBe(0);
    });

    test("get", () => {
        list.append(1);
        expect(list.get(0)).toBe(1);
        expect(list.get(1)).toBeUndefined();
    });

    test("removeAt", () => {
        list.append(1);
        expect(list.removeAt(0)).toBe(1);
        expect(list.length).toBe(0);
    });

});
