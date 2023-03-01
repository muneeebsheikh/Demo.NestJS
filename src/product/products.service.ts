import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const currentDate = new Date();
        // the number of .net ticks at the unix epoch
        var epochTicks = 621355968000000000;

        // there are 10000 .net ticks per millisecond
        var ticksPerMillisecond = 10000;


        var _id = epochTicks + (currentDate.getTime() * ticksPerMillisecond);

        const newProduct = new Product(_id.toString(), title, desc, price)
        this.products.push(newProduct);
        return _id;
    }

    getProducts(){
        // or .slice()
        return [...this.products];

    }

    getSingleProduct(id: string){
        const prod = this.findProduct(id)[0];
        return {...prod}
    }

    updateProduct(productId:string, title: string, desc: string, price: number){
        const [product, prodIndex] = this.findProduct(productId);
        const updatedProduct = {...product}; 
        if(title)
            updatedProduct.title = title;
        if(desc)
            updatedProduct.description = desc;
        if(price)
            updatedProduct.price = price;

        this.products[prodIndex] = updatedProduct;
    }

    deleteProduct(prodId: string){
        const [_, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
    }


    private findProduct(id: string): [Product, number]{
        const prodIndex = this.products.findIndex(p => p.id == id)
        const prod = this.products[prodIndex];
        if(!prod){
            throw new NotFoundException('Could not find product');
        }
        return [prod, prodIndex];
    }



}