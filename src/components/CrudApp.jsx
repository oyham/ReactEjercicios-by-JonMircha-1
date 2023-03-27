import React, { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";

const initialDb = [
    {
        id: 1,
        name: "Seiya",
        constellation: "Pegaso",
    },
    {
        id: 2,
        name: "Shiru",
        constellation: "Dragón",
    },
    {
        id: 3,
        name: "Hyoga",
        constellation: "Cisne",
    },
    {
        id: 4,
        name: "Shun",
        constellation: "Andrómeda",
    },
    {
        id: 5,
        name: "Ikki",
        constellation: "Fénix",
    },
]


export default function CrudApp() {
    const [db, setDb] = useState(initialDb)
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) => {
        data.id = Date.now();
        setDb([...db, data])
    }

    const updateData = (data) => {
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData)
    }

    const deleteData = (id) => {
        let isDelete = confirm(`Estás seguro ded elimninar el registro con el id '${id}'`)

        if(isDelete){
            let newData = db.filter(el => el.id !== id)
            setDb(newData)
        } else {
            setError(res)
            //return
        }

        /* let newData = initialDb.filter(data => data.id !== id);
        setDb(newData) */
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    return (
        <>
            <h2>CrudApp</h2>
            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            <CrudTable
                data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        </>
    )
}