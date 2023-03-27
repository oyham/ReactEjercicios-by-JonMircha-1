import React, { useState, useEffect } from 'react';

const initialForm = {
  name: "",
  constellation: "",
  id: null,
}


export const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
   }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSumbit = (e) => {
    e.preventDefault()

    if (!form.name || !form.constellation) {
      alert("Datos incompletos")
      return;
    }

    if (form.id === null) {
      createData(form)
    } else {
      updateData(form)
    }

    handleReset()
  }

  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  }

  return (
    <div>
      <h3>{dataToEdit ? `Editar` : `Agregar`}</h3>
      <form onSubmit={handleSumbit}>
        <input onChange={handleChange} value={form.name} type="text" name='name' placeholder='nombre' />
        <input onChange={handleChange} value={form.constellation} type="text" name='constellation' placeholder='constelación' />
        <input type="submit" />
        <input onClick={handleReset} type="reset" value='Limpiar' />
      </form>
    </div>
  )
}
