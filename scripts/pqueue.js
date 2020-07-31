/* 
 * Class representing a Pair <key, value> of values. 
 */
class Pair {

    /*
     * Constructor
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    /*
     * Returns the key of this Pair.
     */
    getKey() {
        return this.key;
    }

    /*
     * Returns the value of this Pair.
     */
    getValue() {
        return this.value;
    }
}

/*
 * Clsss resembling an implementation of a PriorityQueue. 
 * The first element ("min") has the maximum key of all the elements in the PQueue 
 * and is removed if the capacity is reached and an element with a smaller key is 
 * supposed to be added. 
 * Intenally a heap structure is used. 
 */
class PseudoPQueue {
    constructor(trees) {
        this.data = [];
        this.capacity = 50;
    }

    /* 
     * Returns whether this PriorityQueue is empty.
     */
    isEmpty() {
        return this.data.length == 0;
    }

    /* 
     * Returns the value of the first element. 
     */
    min() {
        if (this.data.length != 0) {
            return this.data[0].getValue();
        }
    }

    /*
     * Returns the key of the first element.
     */
    minKey() {
        if (this.data.length != 0) {
            return this.data[0].getKey();
        }
    }

    /*
     * Removes the first element and returns its value.
     */
    deleteMin() {
        var min = this.data[0];
        this.data.splice(0, 1);
        return min.getValue();
    }

    /* 
     * Enqueues a new element iff there is still capacity or 
     * if its key is smaller than that of the current first element.
     */
    enqueue(key, value) {
        if (this.data.length >= this.capacity) {
            this.replace(key, value);
        } else {
            this.insert(key, value);
        }
    }

    /* 
     * Removes current min element and adds the new element at its correct position.
     */
    replace(key, value) {
        if (this.data[0].key < key) {
            return;
        } else {
            this.data.splice(0, 1);
            this.insert(key, value);
        }
    }

    /* 
     * Inserts a new element at its correct position.
     */
    insert(key, value) {
        var current = this.data.length;
        var newElement = new Pair(key, value);
        this.data.push(newElement);
        while ((current != 0) && (this.data[this.parent(current)].getKey() < key)) {
            this.data[current] = this.data[this.parent(current)];
            current = this.parent(current);
        }
        this.data[current] = newElement;
    }

    /*
     * Returns the index of the parent element of the given index in the heap. 
     */
    parent(i) {
        var value = 0;
        if (i != 0) {
            value = Math.floor((i - 1) / 2);
        }
        return value;
    }
}
