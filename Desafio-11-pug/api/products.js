// Product constructor
class Products {

    constructor () {
        this.items = []
    }

    addProduct(product) {
        const newItem = {
            id: this.items.length + 1,
            ...product
        }
        this.items.push(newItem)

        return newItem
    }

    viewAll() {
        return this.items;
    }

    viewByID(id) {
        return this.items.find(prod => prod.id === Number(id));
    }

    updateProduct(id, product) {
        let itemToUpdate = this.items.find(prod => prod.id === Number(id));

        itemToUpdate = {
            id: this.items.id,
            ...product
        };

        this.items[itemToUpdate.id - 1] = itemToUpdate;
        return itemToUpdate;
    }

    deleteProduct(id, product) {
        const itemToDelete = this.items.find(prod => prod.id === Number(id));

        this.items.splice(itemToDelete.id - 1, 1);
        return itemToDelete;
    }

}

module.exports = new Products()