class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable (value) {
        this.available = value;
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available)
        this.amount = amount;
    }
}

class GoodsList {
    constructor(filter, sortPrice, sortDir) {
        this._goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir; 
    }

    get list() {
        const SaleList = this._goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice) {
            return SaleList;
        }
        if (this.sortDir) {
            return SaleList.sort((a, b) => (a.price - b.price));
        }
        return SaleList.sort((a, b) => (b.price - a.price)); 
    }

    add(good) {
        this._goods.push(good);
    }

    remove(id) {
        let index = this._goods.findIndex(good => good.id === id);
        if (index != undefined) {
            this._goods.splice(index, 1);
        }
        return index
    }
}

class Basket {
    constructor () {
        this.goods = [];
    }    

    get totalAmount() { 
        return this.goods.map(item => item.amount).reduce((acc, cur) => acc + cur, 0);
    }

    get totalSum() {
        return this.goods.reduce((acc, cur) => acc + cur.amount * cur.price, 0);
    }

    add (good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        }
        else {
            let addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            }
            else {
                this.goods[index].amount -= amount;
            }
        }
    } 

    clear () {
        this.goods = [];
    }

    removeUnavailabel() {
        this.goods = this.goods.filter(item => item.available);
    } 
}

function main () {

    const first = new Good(1, "T-shirt", "color: white", ["S", "M", "XL"], 1500, true);
    const second = new Good(2, "Dress", "color: red", ["S", "M", "L"], 10000, true);
    const third = new Good(3, "Jacket", "color: black", ["XS", "M", "XXL"], 35000, true);
    const fourth = new Good(4, "Jeans", "color: blue", ["S", "M", "L"], 8000, true);
    const fifth = new Good(5, "Shorts", "color: grey", ["L", "XL"], 4500, true);

    // console.log(first);
    // console.log(third.available);
    third.setAvailable(false);
    first.setAvailable(false);
    // console.log(third.available);

    const catalog = new GoodsList(/Jeans/i, true, false);
    
    catalog.add(first);
    catalog.add(second);
    catalog.add(third);
    catalog.add(fourth);
    catalog.add(fifth);
    
    // console.log(catalog.list);

    catalog.remove(third);
    // console.log(catalog);
    // console.log(catalog['third']);

    const basket = new Basket();

    basket.add(first, 5);
    // basket.add(first, 2);
    basket.add(second, 3);
    basket.add(third, 2);
    basket.add(fourth, 3);
    basket.add(fifth, 1);
    // console.log(basket.goods);

    console.log("Товаров в корзине", basket.totalAmount);
    console.log("Товаров на сумму", basket.totalSum);

    basket.remove(first, 2);
    // console.log(basket.goods[0].amount);
    basket.remove(fifth, 2);
    // console.log(basket[4]);

    console.log(basket.goods)
    // third.setAvailable(false);
    basket.removeUnavailabel(); 
    console.log(basket.goods);

    basket.clear();
    console.log(basket.goods);


}

main ();