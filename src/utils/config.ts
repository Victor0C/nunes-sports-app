import { Product } from "./product.interface";

export class Config{
    private apiURL: string = 'http://localhost:3000'

    public async getProduct(): Promise<Product[]>{
        const data: Product[] = await fetch(this.apiURL + '/product').then(response => {
            if(!response.ok){
                throw new Error(`Failed to get data: ${response.status}`)
            }
            return response.json();
        })

        return data
    }

    public async creatProduct(product: Omit<Product, 'id'>){
        const data: Product = await fetch(this.apiURL + '/product', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if(!response.ok){
                throw new Error(`failure to create the product: ${response.status}`)
            }
            return response.json();
        })

        return data
    }

    public async updateProduct(product: Omit<Product, 'id'>){
        const result:{generatedMaps: [], raw: [], affected: number} = await fetch(this.apiURL + `/product/${product.code}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if(!response.ok){
                throw new Error(`failure to update the product: ${response.status}`)
            }
            return response.json();
        })

        return result ? true : false
    }
    public async deleteProduct(code: string){
        const result:{raw: [], affected: number} = await fetch(this.apiURL + `/product/${code}`, {
            method: 'DELETE',
        }).then(response => {
            if(!response.ok){
                throw new Error(`failure to delete the product: ${response.status}`)
            }
            return response.json();
        })

        return result ? true : false
    }
}