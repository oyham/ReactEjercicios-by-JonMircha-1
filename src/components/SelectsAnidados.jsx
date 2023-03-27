import React, { useState } from 'react'
import SelectList from './SelectList'

function SelectsAnidados() {
    const [state, setState] = useState("")
    const [town, setTown] = useState("")
    const [suburb, setSuburb] = useState("")

    const TOKEN = "be17185b-49e7-4bf0-8489-a600e38cf608"

    return (
        <div>
            <h2>Selects Anidados</h2>
            <h3>México - Sin Creditos para las peticiones</h3>
            <SelectList title='estado' url={`https://api.copomex.com/query/get_estados?token=${TOKEN}`} handleChange={(e) => { setState(e.target.value) }} />
            {state && (
                <SelectList title='municipios' url={`https://api.copomex.com/query/get_municipio_por_estado/${state}?token=${TOKEN}`} handleChange={(e) => { setTown(e.target.value) }} />
            )}
            {town && (
                <SelectList title='colonia' url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=${TOKEN}`} handleChange={(e) => { setSuburb(e.target.value) }} />
            )}
            <pre>
                <code>
                    {state} - {town} - {suburb}
                </code>
            </pre>
        </div>
    )
}

export default SelectsAnidados