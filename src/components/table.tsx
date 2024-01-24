import { useEffect, useState } from "react";
import { Product } from "../utils/product.interface";
import { Config } from "../utils/config";
import { Edit } from "./edit";
import { Delete } from "./delete";
import { ModalProduct } from "./modal";


export function TableProducts(){
  const requests = new Config
  const [data, setData] = useState(Array<Product>);
  const [refres, setRefresh] = useState(Boolean)
  const updateTable = ():void => setRefresh(!refres)
  
  useEffect(() => {
    requests.getProduct().then(getData => setData(getData) )
  }, [refres])
  
  return(
    <>
    <div className="table-responsive container h-50 mb-1">
      <table className="table text-center ">
        <thead className="sticky-top">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Preço</th>
            <th scope="col">Código</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {
            data.map((product: Product)=>(
              <tr key={product.code}>
                <td>{product.name}</td>
                <td>{product.desc}</td>
                <td>{product.price}</td>
                <td>{product.code}</td>
                <td>
                  <div className="d-flex justify-content-center actions pt-1">
                    <Edit data={product} callback={updateTable}/> <Delete data={product} callback={updateTable}/>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
    </table>
    </div>
  <ModalProduct codes={data.map((data)=>data.code)} callback={updateTable} button={true}/>
  </>
  )
}