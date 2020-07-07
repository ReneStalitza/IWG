class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }
}

class PseudoPQueue {
    constructor(trees) {
        this.data = [];
        this.capacity = 50;
    }

    isEmpty() {
        return this.data.length == 0;
    }

    min() {
        if (this.data.length != 0) {
            return this.data[0].getValue();
        }
    }

    minKey() {
        if (this.data.length != 0) {
            return this.data[0].getKey();
        }
    }

    deleteMin() {
        var min = this.data[0];
        this.data.splice(0, 1);
        return min.getValue();
    }

    enqueue(key, value) {
        console.log(this.data.length);
        console.log(this.capacity);
        if (this.data.length >= this.capacity) {
            this.replace(key, value);
        } else {
            this.insert(key, value);
        }
    }

    replace(key, value) {
        if (this.data[0].key < key) {
            return;
        } else {
            this.data.splice(0, 1);
            this.insert(key, value);
        }
    }

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

    parent(i) {
        var value = 0;
        if (i != 0) {
            value = Math.floor((i - 1) / 2);
        }
        return value;
    }
}
