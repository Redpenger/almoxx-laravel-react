import { useState } from "react";
import Externo from "./Form/Externo";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";

export default function FieldsetVariacao({variacoes, handleChange, acao, values}) {
    console.log(values)
    const [produtos, setProdutos] = useState([])
    useEffect(() => {
        if(acao.tipo != 'edit') {
            addProduto()    
            return
        }
        values?.produtos?.forEach((produto, index) => {
            addProduto(produto)
        });
    }, [])

    function addProduto(values) {
        setProdutos(prev => {
            return [
                ...prev,
                <div className="my-2 flex">
                    <div className="w-full">
                        <label className="block">Produto {produtos.length + 1}</label>
                        <Externo values={{codigo: values?.produto_id, nome: values?.produto?.nome}} campoCodigo={`produto_${variacoes.length}[]`} campoNome={`produto_nome_${variacoes.length}[]`} handleChange={handleChange} paginaExterno={'produtoConsulta'} />
                    </div>
                    <div>
                        <label htmlFor="">Quantidade</label>
                        <input value={values?.quantidade} className="rounded-md p-1 w-28" type="number" name={`produto_${variacoes.length}_${produtos.length}_quantidade`} />
                    </div>
                </div>
            ]
        })
    }

    return (
        <fieldset className="border border-black p-2 rounded-md">
            <legend className="mx-2 px-2 font-medium">Variação {variacoes.length + 1}</legend>
            <input type="text" name={`variacao[]`}  value={values?.nome} className="block w-full rounded-md p-1"/>
            {produtos.length > 0 && produtos.map((produto,index) => (
                <React.Fragment key={index}>
                    {produto}
                </React.Fragment>
            ))}
            <Button onClick={addProduto} variant="contained" sx={{fontSize: '11px', margin: '3px 0px'}}>+ produto</Button>
        </fieldset>
    )
}