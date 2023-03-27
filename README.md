# 28. CRUD App: Creacion de componentes y renderizado de datos (1/4)

Los primeros pasos para crear el CRUD es crear un archivo llamado ``CrudApp``, en este se encontrara el _*formulario*_ donde iremos agregando datos, y una _*tabla*_ donde se iran pintando dichos datos en el DOM.
También creamos una base de datos para hacer uso de la petición a utilizar.

```js
const initialDb = [
    {
        id: 1,
        name: "Seiya",
        constellation: "Pegaso",
    },
]
export default function CrudApp() {
    return (
        <>
            <h2>CRUD App</h2>
            <form></form> Aquí iría el CrudForm
            <table></table> Aquí iría el CrudTable
        </>
    )
}
```

Para la creación del form trabajaremos con componentes separados para un mejor manejo de estos, asi que crearemos un ``CrudForm.jsx``. Este posee el formulario y los eventos correspondientes. Necesitamos *3* manejadores que se encargaran de: 
- handleChange: manejara los inputs donde iran las entradas strings, en este caso nombre y constelación.
- handleSubmit: manejara el form con la etiqueta onSubmit ya que se encargará de hacer el envío de los datos.
- handleReset: manejara el input con type='reset', este se encarga de resetear el formulario con el *e* onClick.

Inicialmente crearemos una const que posea las props de la base de datos que creamos para que no haya warnings a la primera inicialización del formulario. ``InitialFrom`` será el estado inicial de los inputs con value form.
```js
const initialForm = {
  name:"",
  constellation:"",
  id: null,
}


export const CrudForm = () => {
    const [form,setForm] = useState(initialForm)

    const handleChange = (e) =>{}
    const handleSumbit = (e) =>{}
    const handleReset = (e) =>{}

  return (
    <div>
        <h3>Agregar</h3>
        <form onSubmit={handleSumbit}>
            <input onChange={handleChange} value={form.name} type="text" name='name' placeholder='nombre' />
            <input onChange={handleChange} value={form.constellation} type="text" name='constelattion' placeholder='constelación' />
            <input type="submit"/>
            <input onClick={handleReset} type="reset" value ='Limpiar'/>
        </form>
    </div>
  )
}
```
Ya hecho este paso seguiremos con la creación del ``CrudTable``. Esta tendrá la función de mostrar los datos obtenidos de la initialDb que creamos en ``CrudApp``, y mostrará los datos que iremos agregando a traves del ``CrudForm``. 
```js
export const CrudTable = () => {
    return (
        <>
            <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constelación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Oyham</td>
                        <td>Piscis</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
```
Para mostrar la base de datos inicial debemos de crear un useState con el estado inicial InitialDb, para luego pasarla como prop a la CrudTable, quedando lo siguiente:

```js
const initialDb = [...]

export default function CrudApp() {
    const [db,setDb] = useState(initialDb)

    return (
        <>
            <h2>CRUD App</h2>
            <CrudForm />
            <CrudTable data={db} />
        </>
    )
}
```
La prop data sera envíada al CrudTable, y este hara la destruccturación: ``export const CrudTable = ({data}) =>``

Luego en el CrudTable haremos una separación de lo que se encuentre en tbody, creando así un nuevo componente llamado ```CrudTableRow``. Este poseera lo que prev se encontraba en el tbody. 

En el CrudTable, en la parte del tbody, realizaremos un conditional render, preguntandonos sobre la Db en caso de que exista pero vacía. Si no viene vacía realizaremos un mapeo  por cada *_el_* proveniente de dicha base de datos, y por cada uno renderizara el componente ``CrudTableRow``.

```js
<tbody>
    {data.lenght === 0 ? (
         <tr>
            <td colSpan="3">Sin datos</td>
        </tr>
        ) : (
            data.map(el => <CrudTableRow key={el.id} el={el}/>)
        )}
</tbody>
```
### No debemos de olvidarnos del atributo key, y pasaremos la prop el (datos del elementos).

Al añadir el atributo *_el_* al componente, éste será enviado como prop {el} `export const CrudTableRow = ({el}) =>`, para así poder pintar el DOM con la initialDb.
```js
<tr>
    <td>{el.name}</td>
    <td>{el.constellation}</td>
    <td>
        <button>Editar</button>
        <button>Eliminar</button>
    </td>
</tr>
```

---

# 29. CRUD App: Inserción de datos (2/4)

Comenzamos creando una `const createData = (data) => {}`. Esta función creara un nuevo registro en nuestra base de datos falsa. Recibira el objeto data con la info que usará para crear dichos datos. También necesitamos una `const updateData = (data) => {}`. Tambien necesita la data para la actualización de la base de fatos falsa. Y por ultimo creamos la `const deleteData = (id) => {}`, que sólo necesita la id para poder acceder a dicha prop y eliminar la data que queramos.

Luego dentro del CrudApp creamos el estado `const [dataToEdit, setDataToEdit] = useState(null)` para la inserción y actulaización de la información.

El formulario recibirá 4 propiedades (1 valor y 3 funciones) que se encargaran de la creación, actualización, y la var de estado para diferenciar entre create y update => dataToEdit y la función que la actualiza => setDataToEdit.
---
Para eliminar pasaremos el deleteData al CrudTable. Tambien necesita la función actualizadora para el botón de editar.

```js
const createData = (data) => {}
const updateData = (data) => {}
const deleteData = (id) => {}

export default function CrudApp() {
    ...
    const [dataToEdit, setDataToEdit] = useState(null)
    ...
            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>
}
```

Recordemos que el evento handleChange actualiza los datos del form. Y para hacerlo todo de una manera más automatica, pasaremos el estado con el spreed-operator, y luego el input que se esté actualizando, utilizamos la destructuracion para que la prop name del inpuit la tome como atributo del objeto que se está construyendo ahora, y se le asigna su respectivo valor.
```js
const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
```
Como vamos a controlar mediante js el evento del form, añadiremos ``e.preventDefault()`` al handleSubmit para que no se autoprocese el formulario. Agregaremos un condicional por si los inputs se envían vacíos con:
```js
if(!form.name || !form.constellation){
      alert("Datos incompletos")
      return;
    }
```
Para la validación del id, segun queramos añadir o editar datos, debemos de realizar la destructuración de las props padres provenientes del CrudForm en CrudApp. `export const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) =>`. Si el id viene nulo, se ejecutara createData, recibiendo la data proveniente del estado inicial initialForm, y esta var de estado se pasara justamente por el handleSubmit al componente padre, y la data de `const createData =(data) =>{}` se convierte en el valor del form que estemos trabajando.
En cambio, si el id no viene vacío, significa que queremos editar dicho id.
Para finalizar ejecutaremos en handleReset() para limpiar el fomrulario.
```js
const handleSumbit = (e) => {
    e.preventDefault()

    if(!form.name || !form.constellation){
      alert("Datos incompletos")
      return;
    }

    if(form.id === null){
      createData(form)
    } else {
      updateData(form)
    }

    handleReset()
  }
```
Recordemos que este formulario esta controlado por la var de estado form, entonces debemos utilizar la funcion `` setForm()`` que actualiza dicha variable igualandola a la ``initialForm`` para que el name, constelattion y id queden limpios. Tambien deberíamos resetear setDataToEdit a nulo como se encuentra en el componente padre. Para que se muestre la data que envíemos por el form en el DOM, usaremos la función ``createData``...debemos de ejectuar la función `setDb` de la variable de estado que poseemos en `initialDb`, y cómo esta es un arreglo, debemos de decirle que se traiga la base de datos como exista con el spreed operator (el spreedO combina lo que venga en db con lo consiguiente, en este caso, con la data) y agregale la data. Previamente creamos un id.
```js
export default function CrudApp() {
    const [db, setDb] = useState(initialDb)
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) => {
        data.id = Date.now();
        setDb([...db,data])
     }
     ...
}
```

---

# 30. CRUD App. Edición de datos y comunicación entre componentes (3/4)
Destructuramos las props del CrudApp padre hacia el componente hijo y se las pasamos a la CrudTableRow.
```js
export const CrudTable = ({ data, setDataToEdit, deleteData }) => {
    return (
     ...
        data.map(el => (
            <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        ))
    )}
    ...
```
Luego en el CrudTableRow destructuramos las ultimas dos props envíadas y además destructuramos elements `let {name,constellation,id} = el` para simplificar.

Para la ejecución de la edición debemos de asigarle al button ``'editar'`` el evento ``onClick`` para activar el evento en formato de arrow function llamando asi a la función setDataToEdit, que esta en el CrudApp, actualiza esa variable que se encontraría en nula, por eso pasamos todo el objeto *el*, ya que posee los datos.
 Y para el button ``'eliminar'`` va a desencadenar el deleteData, que se encuentra en CrudApp, y sólo necesita el id, por eso se lo debemo de pasar... al hacer click propaga hacia arriba, pasando el id de la fila en la que estemos. 
Esta propagación que estamos realizando se da en 3 pasos. ``CrudApp => CrudTable => CrudTableRow`` y viceversa. Si fuera algo mas complejo podriamos estar utilizando Context. Más adelante lo veremos.

``!Explicación:`` Al hacer click en el button ``'editar'`` enviaremos el *el* a CrudTable, y está a CrudApp. setDataToEdit modifica el estado 'dataToEdit' y poseera toda la data que traía dicho *el* en esa fila *CrudTableRow*.
```js
export const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
    let {name,constellation,id} = el
    return (
        <>
            ...
                <td>{name}</td>
                <td>{constellation}</td>
                ...
                    <button onClick={()=> setDataToEdit(el)}>Editar</button>
                    <button onClick={()=> deleteData(id)}>Eliminar</button>
            ...
        </>
    )
}
```
Seguimos ahora en el CrudForm creando un useEffect para el `dataToEdit` diciendo que el efecto se ejecute cuando dataToEdit cambie. Sabemos que el valor inicial de `dataToEdit` es *null* entonces a traves de un condicional ejectuamos `setForm(dataToEdit)`  para que los datos de esa fila pasen al formulario. Sino ejecutamos el else con `setform(initialForm)`. 
```js
useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
   }, [dataToEdit])
```
!El objeto `dataToEdit` traera el nombre del caballero, la constelación y el id de la fila donde presionamos el botón editar.

Ahora para la updateData actualizaremos la db con un operador ternario. Ya que es un arreglo, debemos de ejecutar un map en una nueva variable para guardar dicho resultado, debemos de verificar a traves del map si se encuentra algun id ya existente para modificar dicha posición. 
```js
const updateData = (data) => {
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData)
    }
```
Aqui decimos que por cada *el* en db verifique el id, y si el id es igual a lo que recibes como dato.id (en su posición id) entonces en esa posición remplazamos la data que esta siendo pasada, sinó el *el* se conserva igual.

Gracias al estado de dataToEdit podemos utilizar un solo form para la creación y la edición de datos.
---

!En el CrudForm, cuando el ``form.id`` es nulo, ejecuta el createData; cuando ya tiene datos, se ejecuta el updateData. **_*¿Cuando este form va a tener datos?*_** Cuando el usuario pulse cualquiera de los botones de editar, se pasa el objeto *el* en ``setDataToEdit``... se regresa hasta CrudApp, y al ejecutarse el setDataToEdit se actualiza la variable `dataToEdit` por el objeto que tragia *el* y entonces ahí como el form recibe la ``dataToEdit``, el CrudForm posee un efecto que está evaluando cualquier cambio que se ejecute en ``[dataToEdit]`` (que recibe como *prop*) y dependiendo de eso actualíza el estado del form con los datos que recibe o con los datos iniciales.
```js
 useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
   }, [dataToEdit]) //Parametro condicional. Al cambiar dataToEdit se ejecuta este efecto.
```
Por ulitmo para que el h3 cambie segun estemos agregando nueva data o editando data existente, utilizaremos un conditional render. ````<h3>{dataToEdit ? `Editar` : `Agregar`}</h3>````

---

# 31. CRUD App. Eliminación de datos y estilos CSS (4/4)

Esta fue mi solución para la eliminacion de datos: 
```js
let newData = initialDb.filter(data => data.id !== id);
        setDb(newData)
```

Pero siguiendo el curso, se recomienda preguntarle al usuario si está seguro de eliminar dicho dato utilizando un confirm... o algunos casos windows.confirm. 
En la solución de jon, la diferencia es que el hace un filter de db y no de initialDb y tiene sentido... aunque a mi también me funcionó con initialDb.
```js
if(isDelete){
    let newData = db.filter(el => el.id !== id)
        setDb(newData) 
    } else {
        return
    }
```

---
---
---

# 32. CRUD API. Creando una API con JSON Server (1/5)
#### instalación global de json-server `npm i -g json-server`.

Empezamos creando un archivo en *components* llamado **CrudApi.jsx** una carpeta en src llamada *api* y dentro creamos el archivo **db.json**, y le pasamos el initialDb de los caballeros que creamos anteriormente.
Tambien crearemos un comando para el início del json-server, ademas de indicarle un puerto diferente al 3000, aunque vite un puerto 5173.
`"fakeapi":"json-server --watch src/api/db.json --port 5000"`
Esto se crea en el archivo `package.json/scripts`. Y tan solo debemos de ejecutar `"npm run fakeapi"` para el levantamiento del db.json.

Luego copiamos todo lo del CrudApp y lo pasamos a CrudApi 

---

# 33. CRUD API. Creación de helper para peticiones AJAX (2/5).
#### creación de una carpeta en *src* llamda *helpers*.

### Mientras que un componente es un código que tiene parte visual, html,css, y js... un Helper es una función que te ayuda a resolver una tarea cómo un componente, pero es más de lógica abstracta que UI. 

Crearemos una míni libreria que resuelva peticiones HTTP vía arquitectura REST.

##### REST deriva de "REpresentational State Transfer"

**¿Por que no se creó un hook en vez de un helper?** Para que un código sea un Hook personalizado, internamente, dentro de su programaciónm se deben utilizar hooks de react `useState, useEffect, useRef...`, pero si realmente no utilizamos ningún hook de react,  no sería un hook personalizado en sí. Por eso que esta pequeña míni libreria es un helper. Este helper no tendrá nada de código React, eso significa que este helper está escrito %100 en vanilla JS.

Empezamos creando una `const customFecth = () =>{}` dentro de la función padre `export const helpHttp = () =>{}` siendo *customFetch* privada, o sea, no se exportara, no se expondrá.

Realizaremos el CRUD bajo la arquitectura REST, y devolveremos un objeto con las peticiones get,post,put,del(delete).
```js
export const helpHttps = () => {
    const customFetch = () => { }

    const get = () => { }
    const post = () => { }
    const put = () => { }
    const del = () => { }

    return {
        get, post, put, del
    }
}
```
El customFetch será ejecutado internamente por los 4 métodos REST. La petición Fetch necesita el endpoint que hace referencia hacia la ruta, y la serie de opciones que pueda recibir Fetch. `const customFetch = (endpoint, options)`. Crearemos una `const defaultHeader = {}` ya que generalmente todas las peticiones realizadas como por ej la libreria axios, toda la *data* la devuelven en formato **json**. 
```js
const defaultHeader = {
        accept: "application/json"
    }
```
**!AbortController**: es un objeto que sirve por si la petición fetch realizada da un error... si es que la base de datos se encuentra caída por **x** motivo o en mantenimiento, y en ese caso nuestro `loader` quedaría mostrandose en la UI por tiempo indeterminado ya que no recibe ninguna respuesta. Es una solución a este problema.
`const controller = new AbortController();`. Dentro del objeto de opciones que posee nuestro `customFetch` debemos de agregar el abortController. Para hacer esto debemos de indicar que dentro del objeto que nos está pasando el usuario, de las opciones de la peticion fetch, agreguemos una peticion llamada signal. Esta agregara el obj controler **+** una propiedad llamada **signal**.
Esto sería un manejador de errores por si nuestro endpoint no nos responde. Puede ser controlado por el usuario o por nuestra cuenta con un SetTimeOut.

Otra opción que necesita la petición Fetch es el método. Indicamos que si el usuario en el objeto de opciones trae método entonces deja el método. Pero si no viene el método específicado, indicaremos por default que se utilizará GET.

Si el usuario especifíca headers, debemos de combinarlas con las defaultHeader que especifíquemos. Para eso crearemos un nuevo objeto que mezcle las dH con un spread-operator.Todo esto utilizando un operador ternario.
Si las peticiones tienen la funcion de mandar datos, recordedmos que exíste una *prop* llamada **body** en las peticiones Fetch. Ya que estamos diciendo que nuestro helpHttp va a aceptar el formato por defecto ``"aplication/json"``, al body debemos de convertirlo a cadena con el metodo ``json.stringify `` ya que viene parseado. Y asi se manda como cadena de texto hacia el backend.
 Si el usuario realiza una petición ``"GET"``, no se mandan datos, solamente se recíbe. Entonces esta option.body no esté especificada dentro de las options que nos haya mandado el user cuando quiera hacer su petición por ``"GET"``, por eso debemos de decirle al options.body que en ese caso sea **"false"**. ¿Por que estamos diciendo que si no viene options.body lo iguale a falso? Porque si el body es falso, lo elimíne, ya que si realizamos una petición ``"GET"`` no necesitamos mandar un body. 

### !No podemos mandar dentro del objeto de opciones de nuestra petición fetch un body vacío o falso, por eso lo eliminamos, para que no marque ningun mensaje de error.
Añadimos el setTimeOut para la activación del controller.
```js
const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;

        options.body = JSON.stringify(options.body) || false;
        if(!options.body) delete options.body;   
        console.log(options)      
        setTimeout(() => controller.abort(), 3000);
```

Lo siguiente que haremos es que la función devuelva la ejecucion de una petición fetch, con la url en su endpoint y sus opciones.Tambien ejecutaremos then y catch, o sea que este customFetch está devolviendo una promesa. En el caso del then, vamos a hacer que devuelva la res con un operador ternario, en caso de que no haya res, se rechaza la promesa con un objeto de error. Y en caso de error, devolverá el error.
```js
return fetch(endpoint, options)
            .then((res) =>
                res.ok
                    ? res.json()
                    : Promise.reject({
                        err: true,
                        status: res.status || "00",
                        statusText: res.statusText || "Ocurrió un error"
                    })
            )
            .catch((err) => err)
```
---
Para finalizar debemos de utilizar el customFetch en los métodos.
- **GET:** El metodo get recibe una url, y capaz pueda recibir opciones, pero sinó, utilizaremos definicion de params por defecto especifícando que options será un obj vacío. Get ejecturaia customFetch, pasandolé el url y opciones.

- **POST:** Necesita url y opciones. Cómo es un metodo post no podemos utilizar el return implícito como en GET. Hay que decirle que cómo es post, hay que agregarle al obj options la prop metodo sea iguál a POST. Indicamos el return con url y options.

- **PUT:** Exactamente que POST y DELETE. 

- **DELETE:** Exactamente que POST y PUT. 

#### options.method = (metodo http) => get,post,put,delete.
```js
const get = (url, options = {}) => customFetch(url, options)

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options)
    }
    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options)
    }
    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options)
    }
```

---

# 34. CRUD API. Inicializar el estado con AJAX (3/5)
Creamos un `let api = helpHttp()` para simplificar el llamado del useHttp, adicionalmente crearemos `let url = "http://localhost:5000/santos"` para no estar escribiendo el endpoint del json-server.

Si la base de datos inicia vacía `const [db, setDb] = useState([])` debemos de utilizar un useEffect para que se vaya cargando la data indicando que la api utilice el metodo "GET", pasandole así la url... y recordemos que nuestro helper devuelve una promesa, entonces podemos utilizar un ``.then()`` para indicarle que nos muestre la res por consola.
```js
useEffect(() => {
      api.get(url).then((res)=> console.log(res))
    }, [])
```
Al ejecutar la carga del DOM, veremos que primero la consola nos arroja el console.log(options) que existe en helpHttp, y luego la res del api. En el primer metodo "``GET``", solo pasamos la url... entonces el helper al no recibir opciones, empieza a construirlas con la lógica que implementamos. Recordemos que tambien nos puede arrojar un error, ejemplo si escribimos mal el URL.
Una vez recibida la res del useEffect, debemos de guardarla en nuestra db para que sea mostrada en el DOM. Para eso utilizaremos un operador ternario, diciendo que cuando la respuesta no tenga una prop llamada **err**, entonces ejecutemos la funcion actualizadora de estado setDb con la respuesta, y sinó que devuelva un return vacío.
```js
useEffect(() => {
      api.get(url).then((res) => {
        // console.log(res)
        if(!res.err){
            setDb(res)
        } else {
            // setDb(null) 
            return;
        }
    })
    }, [])
```
---

# 35. CRUD API. Implementando loaders y mensajes de errores (4/5)
Añadiremos dos variables de estado para estas nuevas funciones.
```js
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
```
El CrudForm siempre está, pero el componente que se va a renderizar dinamicamente si hay datos o no, es el CrudTable. Primero debemos de preguntarnos si la variable loading es verdadera, entonces renderizar ``<Loading />``... lo mismo con el error.
```js
{loading && <Loader />}
{error && <Message />}
```
Cambiaremos la base de datos de un array vacío a nula. Esto nos arrojará un error en consola por la prop ``data.length`` en CrudTable. Para solucionar esto debemos de ejectuar un conditional render en el CrudTable.
```js
{db && <CrudTable
    data={db}
        etDataToEdit={setDataToEdit}
    deleteData={deleteData}
/>}
```
Entonces, como en principio SI existe una db, el CrudTable es renderizado y ya no marcará ningún error.
El siguiente paso sería actualizar el setLoading a true para que se vea el componente del loader, y colocarlo en falso al final del resultado de la promesa de la petición "GET". Luego para el error, dentro del ``if else`` donde actualizamos la db de la app, ejecutamos ``setError(res)`` con el valor de la respuesta.
```js
    useEffect(() => {
        setLoading(true)
        api.get(url).then((res) => {
            // console.log(res)
            if (!res.err) {
                setDb(res)
                setError(null)
            } else {
                setDb(null)
                setError(res)
                // return;
            }
            setLoading(false)
        })
    }, [])
```
Ahora descargamos de loading.io un loader, con su respectivo código css y html. Solo debemos de cambiar el class por className en el código html por que recordemos que React trabaja con jsx.

Ahora con el componente Message, se puede utilizar para envíar mensajes de errores cómo de exíto, de alertas o informativos. Para eso pasaremos dos propiedades. El mensaje que va a imprimir, y el respectivo color. `const Message = ({msg, bgColor}) =>`. Seguimos con la aplicación de estilos en el mismo componente.

```js
const Message = ({msg, bgColor}) => {
    let styles = {
        padding: "1rem",
        marginBottom: "1rem",
        textalign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor
    }
    return (
        <div style={styles}>
            <p>{msg}</p>
        </div>
    )
}
```
Ahora... debemos de enviar las props a través de Message desde CrudApi.
```js
{error && <Message
                msg={`Error ${error.status}: ${error.statusText}`}
                bgColor="#dc3545" />}
```
Recordemos que este mensaje sólo se va a renderizar cuando exista un error. ``status`` y ``statusText`` provienen de la Promise del helper.
Para finalizar añadiremos la var url en el condicional dedl useEffect. Tiene cierto sentido que cuando la url cambie se vuelva a ejectutar el useEffect (esto lo proporcionamos por un warning que le aparecía a jon).

---

# 36. CRUD API. Peticiones HTTP a la API (5/5)
Debemos de modificar create, update y delete Data.

- **createData:** indicamos que se ejecute la función ``helpHttp()`` con post, pasandole la url y el objeto de opciones de la petición fetch, envíando el body que sacamos de la data. Recordemos que la respuesta es una ``promesa``, entonces puede devolver un msje de éxito o de error. Podemos utilizar un condicional según sea la res recibída.
Si no viene ningun err desde la res, entonces podemos setear la db con lo que venga en res. Y si hay algun error, seteamos el error con la res.
```js
    const createData = (data) => {
        data.id = Date.now();
        api.post(url,{body:data}).then((res)=>{
            console.log(res);
            if(!res.err){
                setDb([...db, data])
            } else {
                setError(res)
            }
        })
    }
```
Ahora si realizamos un post, se añade a la tabla la data nueva, pero si vamos al db.json, veremos que sólo existe un id:"6" y nada más. Al recargar la página, aparece en la tabla el elemento pero vacío, respectivamente por que en db.json no se guardó name ni constellation. 
**!¿ID 6?**: json tiene la capacidad de generar un id autonumérico. No respeto el id con Date.now();
Debemos de especificar en el objeto de opciones, el contenty-type (atributo) cómo forma de cabecera. Tambien separamos las opciones así queda mejor ordenado el código.
```js
let options = {body:data, headers:{"content-type":"application/json"}}

api.post(url,options).then((res)=>{
```
¿Por que no añadimos el content-type:application/json a las defaultHeaders? Porque cada api trabaja de manera diferente, posteriormente veremos una api que con esta función no funciona. Por eso no se recomienda colocarla por default.

- **updateData**: Para el update debemos añadirle a la url el id del endpoint que vamos a actualizar. Crearemos una `let endpoint = `${url}/${data.id}``, es la unión de la url + la data que viene el form, y cuando hacemos una edición ya trae el ID. En ``api.put`` debemos de indicar el endpoint y lo demás queda exactamente igual que en createData.
```js
    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body:data, 
            headers:{"content-type":"application/json"}
        }
        api.put(endpoint,options).then((res)=>{
            if(!res.err){
                let newData = db.map(el => el.id === data.id ? data : el)
                setDb(newData)
            } else{
                setError(res)
            }
        })
    }
```

- **deleteData**: Pra el delete necesitamos el endpoint pero sin la data ya que deleteData solo recibe el id. En opciones no necesitamos un body:data por el mismo motivo anterior. Luego queda igual que el deleteData de CrudApp. Recordar que debemos de utilizar api.del ya que asi está especificado en neustro helper.
```js
    const deleteData = (id) => {
        let isDelete = confirm(`Estás seguro ded elimninar el registro con el id '${id}'`)
        if (isDelete) {
            let endpoint = `${url}/${id}`
            let options = {
                headers: { "content-type": "application/json" }
            }
            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = db.filter(el => el.id !== id)
                    setDb(newData)
                } else {
                    return
                }
            })
        } else {
            return
        }
    }
```


!data.map is not a function
---
Este error lo encontré por mi cuenta y ahora Jon está dando la solución. Es un error de lógica. Recordemaos que neustra db comienza en null y que estamos preguntando si data.length === 0. Recordemos que react funciona con jsx y que estas validaciones tienden a fallar según la lógica que queramos mostrar por asi dedcirlo. En vez de utilizar === utilizaremos > , además de invertir la lógica haciendo que primero se haga el mapeo de la data para el renderizado del CrudTableRow.
Pasariamos de esto:
```js
<tbody>
    {data.length === 0 ? (
        <tr>
            <td colSpan="3">Sin datos</td>
        </tr>
    ) : (
        data.map(el => (
            <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        ))
    )}
</tbody>
```
A esto:
```js
<tbody>
    {data.length > 0 ? (
        data.map(el => (
            <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        ))
    ) : (
        <tr>
            <td colSpan="3">Sin datos</td>
        </tr>
        
    )}
</tbody>
```
**Recomendación**: que todo los valores que sean true it sea la primera opción de los condicionales, y que lo vaya tendiendo a falso pase a la segunda opción (else). 

---

# 37. Buscador de canciones. Definición de componentes y lógica (1/5)

Cremos SongSearch ademas de los componentes para la UI de songform y songdetails.

### ¿Que necesitamos? (haciendo referencia a las variables de estado).
- Necesitamos una vde que guarde la búsqueda.
- Necesitamos una vde que guarde la información del artista.
- Necesitamos una vde que guarde la información de la canción.
- Necesitamos una vde que controle la visibilidad del loader.
### Los useEffect los utilizaremos mas adelante a la hora de trabajar con las APIS.

Creamos SongArtis y SongLyric como componentes separados para importarlos en Details.
Luego importamos en Loader por sobre el songform. Al hacer esto el Loader se muestra en la **UI** de manera automática, pero para que no se muestre debemos de vincular la vde ``loading`` con un conditional render diciendo que si ``loading es verdadero`` entonces renderice el **Loader**, pero como inicializa en *false* no se muestra.`{loading && <Loader />}`

Pasaremos como *prop* handleSearch creada previamente `const handleSearch = (data => {}`. Tendrá la función de manejar la vde search. Y a SongDetails envíaremos las props search, liryc y bio.

#### Estos pasos pueden llamarse como la maquetación inicial y mapeado de propiedades.

---

# 38. Buscador de Canciones. Programación de formulario (2/5)

Empezamos creando tres inputs para el formulario, dos tipo texto para la inserción de datos, y el submit.
La mejor forma de interactuar con los forms y lo ideal es tener los formularios controlados a partir de una variable de estado initialFrom, iniciando las props del form inicializandolas en nulos, para así poder asignar las props values y onChange. Creamos el **e** handleChange y pasamos las props a los dos inputs del form.
 **_E_** onChange y el valor que van a estar controlando. 

El evento *handleChange* lo que tiene que hacer es actualizar el estado, utilizando la función setForm. Esta tomará una copia del objeto formulario (initialForm) utilizando el *spread-operator*, y lo va a combinar con el valor del target del evento, pero antes debemos de específicar de dónde proviene el valor del evento... accediendo con [] al name **(los [] hace dinámica la propiedad en el objeto).**  

Luego creamos el handleSubmit con su e.preventDefault y pasandolo como prop al onSubmit del form. Añadimos un if para verificar que el nombre del artista o la canción no vengan vacías, y si es así retornamos para que no siga leyendo el manejador.

### ¿Y si no vienen vacíos los inputs? handleSearch().
Recordemos que al songForm le pasamos como prop el handleSearch. En el componente principal recibe la *data*. La data justamnete sera el objeto form (vde). Al ejecturala le pasamos lo que venga en la vde form, y cómo el formulario en este punto ya se estaría procesando, debemos de limpiarlo inicializandolo a los valores por default.

Los valores del formulario pasan a traves del evento hacia una variable de estado pero de su componente padre.
```js
import React, { useState } from 'react'

const initialForm = {
    artist: "",
    song: "",
}

const SongForm = ({ handleSearch }) => {
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!form.artist || !form.song){
            alert("Datos incompletos")
            return;
        }

        handleSearch(form)
        setForm(initialForm)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name='artist' placeholder='Nombre del interprete'
                    onChange={handleChange} value={form.artist}
                />
                <input type="text" name='song' placeholder='Nombre de la canción'
                    onChange={handleChange} value={form.song}
                />
                <input type="submit" value='Enviar' />
            </form>
        </>
    )
}

export default SongForm
```

---

# 39 Buscador de Canciones. Peticiones AJAX a las APIs (3/5)
#### Recordemos que para las peticiones asíncronas debemos trabajarlas con un useEffect.

!Este efecto va a estar esperando las **res** de estas 2 apis y mientras se ejecutan y esperan...para evitar renderizados innecesarios agregageros un condicional diciendo que si search es identico a nulo que retorne, por que mientras la petición hace la busqueda search va a comenzar con su valor nulo.

Cómo utilizaremos ``asyn await`` debemos de crear una const declarada dentro del useEffect, declararla asíncrona y al final ejecutarla.

Search poseera 2 valores, el artista y la canción, entonces debemos de **destructuralo** dentro de fetchData con {}. Luego guardaremos en variables  los endpoints. Importante copiar el url con el protocolo ``https`` interpolando las variables artist y song.
#### La API del theaudiodb posee sólo la data de coldplay de forma gratuita. Asi que al utilizar otro artista la api arrojará error.

Cómo necesitamos tener ambas informaciones para construir la UI (artist y song) utilizaremos el metodo **All** del constructor **Promise** para que espere ambas peticiones. El setLoading lo utilizaremos dentro del fetch, actualizando la vde de false a true, y luego del await de la petición, convertirla a false nuevamente.

Debemos de destructurar el **Promise.all()** ya que recibe un arreglo con todas las peticiones fetch que querramos hacer, entonces podemos ir guardando en variables dinamicamente gracias a la destructuración de arreglos. Dentro del promise.all debemos de utilizar el ``helper`` para obtener la data, enviando el endpoint, y nuevamente llamar al helper para la petición de la canción. Entonces...
La **res** de la primer promise se guarda en la primer var ``(artistUrl > artistRes)`` y así sucesivamente.
Las res artist (o las res) ya vendrá parseada y en formato json justamente por el helper.
Estos datos se guardaran en las vde ``bio`` y ``lyric``.
```js
useEffect(()=>{
        // helpHttp()
        if(search===null) return;

        const fetchData = async()=>{
            const {artist, song} = search

            let artisUrl =`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
            let songUrl =`https://api.lyrics.ovh/v1/${artist}/${song}`
            
            console.log(artisUrl,songUrl)

            setLoading(true)

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artisUrl),
                helpHttp().get(songUrl),
            ])

            console.log(artistRes,songRes)
            setBio(artistRes)
            setLyric(songRes)
            setLoading(false)
        }

        fetchData()
    },[search])
```

---

# 40. Buscador de Canciones. Renderizado condicional de datos (4/5)
Aplicaremos un conditional render en nuestro songsearch. Recordemos que search empieza en nulo... entonces diremos que si search posea algo y cuando loading sea falso entonces renderice songdetail.
```js
{search && !loading && (
    <SongDetails search={search} lyric={lyric} bio={bio} />
)}
```
Primero para evitar renderizados innecesarios haremos un return null en details si lyric o bio se encuentran en nulo.`if(!lyric || !bio) return null`. Y cuando si posean datos, haran el return del componente. Ahora haremos renderizados condicionales para la letra y la info del artista.
Colocaremos las prop msg y bgColor para el respectivo mensaje de error.
```js
   {lyric.error || lyric.name === "AbortError" ? <Message msg={`Error: no existe la canción: ${search.song}`} bgColor="#dc3545"/> : <SongLyric />}
   {bio.artists ? <SongArtist /> : <Message msg={`Error: no existe el artista: ${search.artist}`} bgColor="#dc3545"/>}
```
Recordemos añadir `lyric.err` ya que es el error que arroja nuestra promesa en caso de que alguna de las peticiones falle. `{lyric.error || lyric.err || lyric.name === "AbortError"...`

---
# 41. Buscador de Canciones. Renderizado de UI y estilos CSS (5/5)
Para añadir etiquetas html ej <em></em> debemos de cambiar un poco el componente message.
Añadiremos un <p /> con la prop dangerouslySetInnerHtml igualandolo a una prop dinámica con {} ademas de despues pasarle el objeto con {} y dentro debe de llevar "__html:" y la prop que querramos pasar.
`<p dangerouslySetInnerHTML={{__html:msg}}/>` para poder utilizar:
`msg={``Error: no existe la canción: <em>${search.song}</em>``}`. No es una buena práctica.

Colocamos un ``<blockquote></blockquote>`` en lyric. Definición: blockquote -cita en bloque . Crea citas en bloque, marca las citas a otros autores o documentos.
Para la inserción de la letra debemos de pasar las props title y lyrics desde Details. title va a ser igual a search.song y lyrics va a ser igual a lyric(prop del componente padre)+lyrics(objeto que nos pasa la api).
`<SongLyric title={search.song} lyrics={lyric.lyrics}/>`.

!Añadir el whiteSpace: pre-wrap para los saltos de linea que provengan del objeto que nos devuelve la api de lyrics ya que sinó no se mostrara en la UI. `style={{whiteSpace:"pre-wrap"}}`.

Ahora para la información del artista, debemos de pasarle la prop a songartist desde songdetails con el nombre de artist. `? <SongArtist artist={bio.artists[0]}/>` recordemos que la información del artista la recibimos a traves de bio, esta, internamente posee artist, que es un arreglo, y en la primera posición proviene la información del artista (gracias a la API). Esto que hicimos es una simplificación.
```js
const SongArtist = ({ artist }) => {
    return (
        <section>
            <h3>{artist.strArtist}</h3>
            <img src={artist.strArtistThumb} alt={artist.strArtist} />
            <p>{artist.intBornYear}-{artist.intDiedYear || "Presente"}</p>
            <p>{artist.strCountry}</p>
            <p>{artist.strGenre}-{artist.strStyle}</p>
            {!artist.strWebsite.length === 0
                ? <a href={`https://${artist.strWebsite}`} target="_blank" rel='noreferrer'>Sitio web</a>
                : <p>No posee sitio web</p>
            }
            <p>{artist.strBiographyEN}</p>
        </section>
    )
}
```

## RECOMENDACION: si un return devuelve un fragmento <></> puede causar complicaciones a la hora de ajustar con grid (por lo que vi hasta ahora), asi que colcamos un div donde teniamos fragments.

---

# 42. Selects Anidados: Definición de componentes y lógica (1/3).
Creamos los componentes SelectsAnidados y SelectList, utilizando **rafce**. Tambien crearemos un hook personalizado.

Necesitamos 3 variables de estado para el manejo de los Estados Mexicanos. Estos se crearan en nuestro componente principal SelectsAnidados.
```js
    const [state, setState] = useState("")
    const [town, setTown] = useState("")
    const [suburb, setSuburb] = useState("")
```
Cada una de nuestras variables va a interactuar con nuestros SelectLists. Para ir mostrando las interacciones crearemos bajo el SelectList un pre > code > con las vde para ir visualizandolas.
Las props que debemos de mandarle a nuestro SelectList son el título, la url y un manejador de evento handleChange, teniendo esta la función de controlar el cambio de los inputs de formulario para tenerlos vinculados
a el estado de su componente, al cambio de su valor. Setearemos entonces el estado con lo que provenga del `e.target.value`. Así para los 3 componentes.
```js
<SelectList title='estados' url='' handleChange={(e)=>{setState(e.target.value)}} />
```
Para no mostrar los 2 ultimos selectores ya que si aún no elegimos estado no tendría mucho sentido que aparezcan en nuestra UI, utilizaremos un conditional render con los operadores de cortocircuito **&&** diciendo que si exíste uno renderiza el siguiente.
```js
{state && (
    <SelectList title='municipios' url='' handleChange={(e) => { setTown(e.target.value) }} />
)}
{town && (
    <SelectList title='colonias' url='' handleChange={(e) => { setSuburb(e.target.value) }} />
)}
```
En el SelectList crearemos nuestro selector con una options dentro.
```js
    <select name="select" id="">
        <option value="1">${}</option>
    </select>
```
---
# 43. Selects Anidados. Hook personalizado para peticiones Fetch (2/3).
Crearemos la carpeta hooks en src y el archivo useFetch.jsx, importando solo useState/Effect ya que sólo devolveremos lógica. Esta función recibira la url y poseera 3 vde, para la información, para los errores y para setear la ui según estén cargados los componentes o no. Toda esta lógica va a ejecutarse en una función de efecto.
Esta va a tener el deber de hacer la petición correspondiente hacia la API, y retornara un objeto que tenga la data, el error y el valor del loading. Este efecto va a depender de la URL que reciba nuestro hook. 
Tambien manejaremos el abort por si la petición fetch se demora o ocurre algún imprevisto. El return abort reemplaza al setTimeout que creamos posteriormente en el `helpHttp` ya que gracias al estar utilizando un hook personalizado estamos manejando toda la lógica dentro de un useEffect, y recordemos que éste posee una caracteristica que cada vez que el efecto termine (cómo para limpiar la memoria de nuestra aplicación)... todo lo que ejecutemos en el return sería la fase del desmontaje.
```js
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    seEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () =>{}
        
        fetchData()


        return () => abortController.abort();
    },[url])
```

Cómo vamos a utilizar una función asíncrona, para poder capturar su error, vamos a utilizar un *trycatchfinally*. En el try crearemos la var res con el respectivo await del fetch(url). Seguimos con la validación de *ok*, propiedad que devuelve fetch, si viene falso crearemos la var err siendo un new Error y asignando err.status(convirtiendolo en objeto) res.status, y err.statusText a res.statusText. Luego utilizamos el return de errores *throw* con err para enviarlo a la parte del *catch*. Y si no hay ningún mensaje de error continuamos con la petición fetch para transformarla a formato json con su await. Sigue otra validación, preguntandos si signal.abort es falso significa que todo va bien, y actualizamos al var data con su funcion setData con el valor de la res en formato JSON, y la var setError la colocamos en nulo. En el *catch* tendremos un condicional similar suponiendo que el signal.abort no es ejecutado pero esta vez devuelve un error, setearemos la data en nulo y el error con su respectico *err*. 
Finalmente colocamos un *finally* para setear otra parte importante. Sea lo que devuelva signal.aborted, el setLoading debe de colocarse en false.
```js
        const fetchData = async () =>{
            setLoading(true)

            try {
                const res = await fetch(url)

                if(!res.ok){
                    let err = new Error("Error en la petición Fetch");
                    err.status = res.status || "00";
                    err.statusText = res.statusText || "Ocurrió un error"
                    throw err;
                }

                const json = await res.json() 
                if(!signal.abort){
                    setData(json)
                    setError(null)
                }
            } catch (err) {
                if(!signal.abort){
                    setData(null)
                    setError(err)
                }
            } finally {
                if(!signal.abort){
                    setLoading(false)
                }
            }
        }
```
---
# 44. Selects Anidados. Renderizado de datos y estilos CSS (3/3).
Importamos nuestro hook useFetch  en SelectList y destructuramos ``title,url y handleChange``. Además de destructurar data, error, y loading del useFetch(url) y poder utilizar estas variables.
 Colocaremos un ``(!data) return null`` para renderizados innecesarios. 

Añadimos un `label` con su etiquéta `htmlFor` que hace referencia al id que tenga el select. Lo formaremos dinamicamente creando `let id = ``select-${title}`. Esta variable la colocaremos como valor de htmlFor, name, y cómo valor del atributo id de nuestro select. Támbien añadimos ``{title}`` al label y colocamos en `options` > Eligue un {title}.

Crearemos un `let label` que extraera el titulo con la propiedad charAt en la pisición 0, para convertirla en mayúscula, concatenandola con la propiedad title, pero cortandola con un `slice` para que empieze a escribirla en el caractér 1. Ésta reemplazara el {title} en nuestra `label`.
Debemos de asignarle el evento handleChange que pasamos cómo *prop* al ``<select>`` en su atributo `onChange`.


### *Un claro ejemplo de porqué separar el código en componentes es muy útil*
Si no hubieramos hecho el componente SelectList, tódo el código que éste posée, lo deberíamos de haber replicado 3 veces en total en nuestro SecetsAnidados.

#### Pequeño hack por jon:
Para obtener la *response* de los estados, municipios y colonias, haremos uso del *title* que enviamos como prop desde SelectsAnidados para extraer dinamicamente los valores y guardarlas en un `let options = data.response[title]`.
Ahora para generar de manéra automatica las respuestas obtenidas como opciones de nuestro select, haremos un mapeo de la variable options y por cada elemento crearemos una etiqueta option con el valor y texto de dicho *el*.
`{data && options.map((el)=> <option value={el}>{el}</option>)}`.

Colocaremos otro condicional por si existe un error, trayendo así nuestro componente Message.
```js
const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url)

  if (!data) return null;
  if (error) {
    return <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="dc3545" />
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);
  let options = data.response[title]

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">Elige un {title}</option>
        {data && options.map((el) => <option value={el}>{el}</option>)}
      </select>
    </>
  )
```
Para ir terminando con la lógica, debemos de guardar en una constante el TOKEN y pasar las url como *props*.
Utiizaremos template strings para las interpolaciones del el TOKEN y ademas poder utilizar las vde ``state`` y ``town`` en las 2 ultimas urls.
```js
...
    const TOKEN = "be17185b-49e7-4bf0-8489-a600e38cf608"
...
    url={`https://api.copomex.com/query/get_estados?token=${TOKEN}`}
...    
    url={`https://api.copomex.com/query/get_municipio_por_estado/${state}?token=${TOKEN}`}
...   
   url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=${TOKEN}`}
```
---
# 45. Validación de formularios. Definición de componentes y lógica (1/4)
##### FORMIK: librería de formularios. Aunque mientras menos dependecias tengamos en nuestro poyecto, mejor irá.
Crearemos el hook personalizado useForm.jsx, recordemos que la caracteristica de un hookP es que pueda abstraer la lógica de un componente, la empaqueta digamos... y entonces el código del componente queda mas enfocado en la UI y la lógca en el hookP.

#### recordar que los hooks personalizados no se exportan por default para respetar el nombre a la hora de la importación, por eso utilizamos rafc.

La primer vde será form y está comenzará con los valores iniciales que reciba como parámetro.
La segunda vde sera errors y comenzará cómo un objeto vacío ya que validaremos que si no posee ningún atributo, no hubo ningún error y podrá ser envíado.
La tercer vde va a manejar el loading a la hora de hacer el envío.
Y la cuarta por el momento seria la vde que devuelva la respuesta luego de hacer el submit.

Además de las variables de estado que seten los datos del formulario, tambíen necesitamos los manejadores de eventos que controlen el formulario, comenzando con: 
- handleChange: detecta la escritura y el cambio de los valores.
- handleBlur: realizará las validaciones de que se lanzen las validaciones. Se encargará del foco de los *el*.
- handleSubmit: manejará el envío del form.

Este hook devolvera las vde y además devolverá los eventos para que los elementos jsx los puedan ejecutar o desencadenar. También el useForm debe de recibir una función que maneje las validaciones, recibida como prop.
Realizado ya los pasos del armado lógico del useForm, pasaremos a los elementos jsx.

Primero, nuestro **ContactForm** debe de destructurar las vde de nuestro *useForm*. Este igualmente inicializará con el initialForm que debemos de crear fuera de ContactForm cómo un objeto vacío. También poseera *validateForm*, una función que se ejecutara fuera del ContactForm, recibiendo la vde form.

Ahora quedaría por estructurar nuestro return jsx. Para eso creamos la etiqueta form con su *onSubmit*, dentro crearemos los inputs. Estos ademas del tipo, name, placeholder, handleChange y required, poseera el atributo **value** que posee la función de setear el valor para poder tener controlado el input a traves de la vde **form.name**.

!Como las validaciones las vamos a hacer cuando pierde el **FOCO** el input, debemos de agregar el evento onBlur, que ejecutará la función handleBlur.

Finalizamos añadiendo un textarea y el input submit.

useForm:
```js
import { useState } from 'react';

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const handleChange = (e) => { }
    const handleBlur = (e) => { }
    const handleSubmit = (e) => { }

    return {
        form, errors, loading, response, handleChange, handleBlur, handleSubmit
    }
}
```
ContactForm:
```js
import React from 'react'
import { useForm } from '../hooks/useForm'

const initialForm = {}
const validateForm = (form) => { }

const ContactForm = () => {
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(initialForm, validateForm)
    return (
        <div>
            <h2>Formulario de Contacto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='name'
                    placeholder='Escribe tu nombre'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.name}
                    required
                />
                <input
                    type="email"
                    name='email'
                    placeholder='Escribe tu email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.email}
                    required
                />
                <input
                    type="text"
                    name='subject'
                    placeholder='Asunto a tratar'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.subject}
                    required
                />
                <textarea
                    name="comments"
                    cols="50" rows="5"
                    placeholder='Escribe tus comentarios'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.comments}
                    required
                ></textarea>
                <input type="submit" value="Envíar"/>
            </form>
        </div>
    )
}

export default ContactForm
```

---
# 46. Validación Formularios. Programación de eventos (2/4)
Comenzamos añadiendo estilos css a los inputs type text, email, y ademas al textarea heredarle la tipografía y colocar su resize en none.

**_handleChange_**: crea una copia del objeto del form y luego sólo actualiza el elemento que cambió. Gracias al spread-operator le pasamos una copia del formulario (de la variable de estado en cuestión), y con las *props* dinámicas actualizamos dicho elemento con los nombres y valores obtenidos.

Según YouCode sobre setForm({...form,[e.target.name]:e.target.value}):
"El código que proporcionaste es una forma de actualizar un objeto "form" en ReactJS. Está usando JavaScript para actualizar el objeto "form" usando la sintaxis de propagación. Está obteniendo el nombre y el valor del objeto de los datos de entrada y luego actualizando el objeto "form" con los nombres y valores proporcionados. Esto es útil para mantener un registro de los datos de un formulario para su posterior procesamiento."

Pero para poder estilizar mejor este procesamiento podemos destructurar el *name* y el *value* de *e.target*.
Recordemos que nuestro **handleChange** es el que se está ejecutando en el evento **onChange** y está ligado al value de los inputs. Esto es lo que nos permite tener formularios controlados con el estado.

**_handleBlur_**: cuando nuestros *el* del form pierdan el foco de la página primero deberia actualizar el estado con la tecnica del handleChange pero aparte la vde errors debería irse actualizando. Repetimos la misma programación del handleChange, llamando a esta función, y adicionalmente, actualizamos al variable setErrors, recibiendo esta el parametro *validateForm*, siendo esta una función , validando las variables del formulario de cada input.
 Para comenzar con una pequeña validación, debemos de dirigirnos a ContactForm dónde se encuentra la función validationForm, inicializando ahi un *let errors = {}*, siendo este un objeto vacío al igual que la inicializacion de errors en nuestro *useForm*, enviando así el mismo tipo de dato. Entonces... validateForm retornará un objeto con props según hayan existido errores, y así a traves de setErrors, actualizar nuestra vde errors.

La primer condicional se preguntará si el nombre del form viene vacio, ademas de utilizar el método *trim()*. Si no tiene información, comenzará a llenarse nuestro objeto errors, asignando así una **prop** llamada name, siendo este el campo que estamos evaluando. !IMPORTANTE: por cada msje de error, habría que configurarlo... asociarlo al mismo input que está dando ese error, por eso utilizamos el mismo nombre. Colocamos el msje de dicho error. Recordar que esta función se ejectura a la hora de ejectuar nuestro handleBlur, al perder el foco de la página, se enviaran dichos datos del form recientemente actualizado por nuestro handleChange y así obtener los datos de última mano.
Crearemos un conficional con un operador de cortocircuito bajo el primero input diciendo que si errors.name existe lanzemos dicho msje de error. Añadimos algo de estilos pertinentemente. `let styles = { fontWeight:"bold", color:"#dc3545"}`,`{errors.name && <p style={styles}>{errors.name}</p>}`. Este conditional render deberiamos de ejecturalo desp de cada input del form.
```js
const handleChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value,
        })
    }
    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validateForm(form))
    }
```
```js
const validateForm = (form) => {
    let errors = {}

    if (!form.name.trim()) {
        errors.name = "El campo 'Nombre' es requerido"
    }
    return errors
}
```
#### El trim()método elimina los espacios en blanco de ambos extremos de una cadena y devuelve una nueva cadena, sin modificar la cadena original.
---
# 47. Validación Formularios. Programación de validaciones (3/4)
Comenzamos definiendo las expresiones regulares para las validaciones de los campos name, email y comments.
- regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
- regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
- regexComments = /^.{1,255}$/;

Si pasa la primer validación, debemos de arrojar la segunda para verificar la regex con el método test() diciendo que cuando la regex no coincida con lo que viene en el nombre del form, entonces arrojamos el error con *errors.name*. Asi mismo ejecutamos los otros inputs excepto el de Subject.
```js
...
let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
let regexComments = /^.{1,255}$/;

if (!form.name.trim()) {
        errors.name = "El campo 'Nombre' es requerido"
    } else if(!regexName.test(form.name.trim())) {
        errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco"
    }

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido"
    } else if(!regexEmail.test(form.email.trim())) {
        errors.email = "El campo 'Email' es incorrecto"
    }

    if (!form.subject.trim()) {
        errors.subject = "El campo 'Asunto a tratar' es requerido"
    }

    if (!form.comments.trim()) {
        errors.comments = "El campo 'Comentarios' es requerido"
    } else if(!regexComments.test(form.comments.trim())) {
        errors.comments = "El campo 'Comentarios' sólo acepta 255 caracteres"
    }
...
```
#### El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
---
# 48. Valediación Formularios. Envíos de datos AJAX y API FormSubmit (4/4)
Comenzamos programando el ``handleSubmit``, colocando un **_e.preventDefault()_** y setear el error con el validateForm.
Colocamos un condicional para que el objeto *errors* se envíe vacío con ``(Object.keys(errors).length === 0)`` midiendo la longitud de las llaves del objeto en cuestion. Cuando sea igual a cero, se ejecutará la petición a "FormSubmit", y sino haremos un return. Si el envío del form se da correctamente, colocamos el **setLoading** en *true* para colocar el **Loader** en la UI y hacer la petición *Fetch*.

Hacemos uso de nuestro *helpHttp* con el método **post()** que es el que pide FormSubmit, ademas del ``.then()`` con la respuesta. Por ``post()`` pasamos la url con nuestro email que recibirá los formularios, y además añadir el objeto con las opciones que va a recibir esta petición.
#### al hacer uso de helpHttp recorar importarlo entre {}.

Luego en la respuesta ejecturamos *setLoading* en falso para que desaparezca de la UI y setear la respuesta con *setResponse* en **true**.
Para que el usuario vea en la UI que el envío del formulario fue exitoso, colocaremos un conditional render al finalizar el form en </form>, diciendo que si loading es verdadero, coloquemos el componente **Loader**. y si la respuesta fue exítosa, llamaremos al componente **Message**, con el msg y bgcolor respectivos. 
Para que el mensaje del formulario envíado no se quede en la UI, colocaremos un *setTimeOut* de 5 segundos luego de que la respuesta se haya colocado en true en nuestro useForm. 

Para finalizar colocamos el formulario en su estado inicial, antes del *setTimeOut*.

ContactForm añadiendo los conditional render:
```js
</form>
{loading && <Loader />}
{response && <Message msg='Formulario Envíado' bgColor="green"/>}
```
useForm:
```js
const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateForm(form))
        if (Object.keys(errors).length === 0) {
            alert("Enviando Formulario")
            setLoading(true)
            helpHttp()
                .post("https://formsubmit.co/ajax/example@example.com", {
                    body: form,
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json",
                    },
                })
                .then((res) => {
                    setLoading(false)
                    setResponse(true)
                    setForm(initialForm)
                    setTimeout(() => {
                        setResponse(false)
                    }, 5000);
                })
        } else {
            return;
        }
    }

```
---
# 49. Ventana Modal. La prop children de los componentes (1/3)
Crearemos el componente ``Modals.jsx`` en plural para que los ejemplos de los modales sean llamados en éste, y así mismo seguir el orden en `App.jsx` llamando a "Modals". Posteriormente crearemos `Modal.jsx` y `Modal.css`.

- Abstraeremos la lógica asi que crearemos un hook personalizado `useModal.jsx`.
- Asignaremos un botón para activar y desactivar la ventana modal según las que tengamos.
- En Modal.jsx importaremos css y devolveremos un article con todo el código jsx

Nuestro `article` poseera la className modal y is-open, que luego será asignado al evento *onClick* del botón en cuestión. Dentro tendremos una div con la clase modal-container dónde se mostrará todo el contenido, y cómo hijos esta div tendra el botón de cierre de la ventana con la clase modal-close, y además el contendio aprovechando así la prop children de los componentes, siendo éste un componente contendeor.
 Realizamos la destructuración de la propiedad ``"children"``, e interpolaremos la prop children bajo el botón de cierre.

Pasamos a llamar el componente Modal en Modals, utilizando la técnica de etiqueta de apertura y de cierre, y dentro poder colocar un **h3**, un **p** y un **img**. Estas etiquetas son enviadas como props a nuestro Modal con la palabra ``"children"``. 

¿Y de dónde sale "children" si no está definida como *prop*? *``CHILDREN``* hace referencia al contenido interno que posea dicho componente a la hora de ser llamado.

Si visualizamos Componentes de nuestra react-developer-tools veremos que la prop children es un array donde va guardando los componentes internos por cada nodo jsx que creemos.

#### En resumen, además de poder pasar props internamente cómo lo veníamos viendo, tambien podemos pasar contenidos diferentes.
Modals:
```js
import React from 'react' 
import Modal from './Modal'

const Modals = () => {
    return (
        <div>
            <h2>Modales</h2>
            <button>Modal 1</button>
            <Modal>
                <h3>Modal 1</h3>
                <p>Hola este es el contenido de mi modal 1</p>
                <img src="https://placeimg.com/400/400/animals" alt="Animals" />
            </Modal>
            <button>Modal 2</button>
            <Modal>
                <h3>Modal 2</h3>
                <p>Contenido del segundo modal</p>
                <img src="https://placeimg.com/400/400/any" alt="Any" />
            </Modal>
        </div>
    )
}

export default Modals
```
Modal:
```js
import React from 'react'
import './Modal.css'

const Modal = ({ children }) => {
    return (
        <article className='modal is-open'>
            <div className="modal-container">
                <button className="modal-close">X</button>
                {children}
                <hr />
            </div>
        </article>
    )
}

export default Modal
```
---
# 50. Ventana Modal. Estilos y lógica del componente (2/3)
#### Cómo quiero enfocarme más en la lógica de la programación y no tanto en los estilos, sólo voy a enseñar el código css implementado (a no ser que sea algo importante cómo para tomar nota).

Comenzamos dandole estílos a la clase modal:
```css
.modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0,0,0,.75);
    display: none;
    justify-content: center;
    align-items: center;
}
```
Estilos de la prop is-open:
```css
.modal.is-open {
    display: flex;
}
```
##### al asignar un "." luego de una prop respectivamente, estamos diciendo que cuando la "prop" (en este caso 'modal') posea la clase 'is-open', se le asignen dichos estílos.

Estilos de la prop modal-container:
```css
.modal-container {
    position: relative;
    padding: 1rem;
    min-width: 320px;
    max-width: 480px;
    min-height: 200px;
    max-height: 600px;
    overflow-y: auto;
    background-color: #aaa;
}
```
Estilos de la prop modal-close:
```css
.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
```
<hr style="height:1px"/>

Ahora pasamos a la programación del ``useModal`` con rafc importando useState. La variable de estado `isOpen` se encargara de saber si el modal se encuentra abierto o no, con su estado inicial llamado ``initialValue``. Esta se recibirá cómo prop, y si el usuario no nos la pasa, le asignaremos por default el valor de *false*. Esto signifíca que los modales inicializaran ocultos. También necesitamos un método que nos permita abrir el modal llamado ``openModal`` siendo esta una arrow function, ejecutando la funcion actualizadora del estado a *true*, además de poseer otro de cierre llamado ``closeModal``, igualando la función de la vde a *false*. *useModal* tendrá un return de la vde ``isOpen`` con sus respectivas funciones en forma de arreglo [].

Enviamos a llamar nuestro useModal en nuestro componente Modals, y por cada modal que creemos, posean la opción de utilizar nuestro hook personalizado. 
Al hacer la *invocación* del useModal con las variables que regresa éste, sólo se encargara de controlar al primer modal ya que luego lo especificaremos. Tenemos la opción de utilizar los useModal que necesitemos, mientras sus variables que enviemos en el array posean nombres diferentes.
```js
const Modals = () => {
    const [isOpenModal1,openModal1,closeModal1] = useModal(false)
    const [isOpenModal2,openModal2,closeModal2] = useModal(false)
...    
```
useModal:
```js
import {useState} from 'react'

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  return [isOpen,openModal, closeModal]
}
```
---
# 51.Ventana Modal. Funcionalidad y reutilización del componente (3/3)
Empezamos ocupando todas las variables de nuestro hook personalizado asignandolas cómo props en los buttons y en el componente ``<Modal>``, el evento ``onClick`` con la prop ``openModal`` para los botones, y para los modales ``isOpen`` con la prop ``isOpenModal``, y ``closeModal`` con la prop ``closeModal``.
Renderizaremos condicionalmente la prop "is-open", recibiendo cómo prop isOpen en Modal, que es la que se encarga de saber si se debe de mostrar o no dicho modal; además de la función closeModal.

En vez de tener un ``className`` *estático* en nuestro article, tendremos un className **dinámico**, utilizando "`template-string`", diciendo que la clase modal la debe de tener si o si, pero que la clase ``is-open`` sólo se va a ejectura cuando la prop ``isOpen`` que esta recibiendo como prop sea *true*, utilizando un operador de cortocircuito.
 Para el botón de cierre, le asignamos en su evento ``onClick``, la prop ``closeModal``.
Muchas ventanas modales permiten el cierre al hacer click en la parte exterior opaca, esto lo conseguimos dandole en el evento *onClick* al article con la prop *closeModal*, pero al hacer esto, tambien el chlidren contenedor recibe dicha **prop** y al recibir un click cómo por ej en el texto, se cierra. Para evitar esto debemos de detener la propagación del evento dentro de nuestro componente modal creando así un manejador de dicho evento con el método "``stopPropagation()``", evitando asi el evento dentro del arbol del DOM. 
##### crearemos un modal y dentro llamaremos al componente ContactForm.
```js
const Modals = () => {
    const [isOpenModal1,openModal1,closeModal1] = useModal(false)
    const [isOpenModal2,openModal2,closeModal2] = useModal(false)
    const [isOpenContact,openModalContact,closeModalContact] = useModal(false)
    return (
        <div>
            <h2>Modales</h2>
            <button onClick={openModal1}>Modal 1</button>
            <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
                <h3>Modal 1</h3>
                <p>Hola este es el contenido de mi modal 1</p>
                <img src="https://placeimg.com/400/400/animals" alt="Animals" />
            </Modal>
            <button onClick={openModal2}>Modal 2</button>
            <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
                <h3>Modal 2</h3>
                <p>Contenido del segundo modal</p>
                <img src="https://placeimg.com/400/400/any" alt="Any" />
            </Modal>
            <button onClick={openModalContact}>Modal Contacto</button>
            <Modal isOpen={isOpenContact} closeModal={closeModalContact}>
                <ContactForm />
            </Modal>
        </div>
    )
}
```
```js
const Modal = ({ children, isOpen, closeModal }) => {
    const handleModalContainerClick = e => e.stopPropagation()
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalContainerClick}>
                <button className="modal-close" onClick={closeModal}>X</button>
                {children}
            </div>
        </article>
    )
}
```
---
# 52. Portales 🌌⚛️
Imaginemos que deseamos tener elementos html a la carga del DOM, sin tener que renderizarlo a traves del "id=root", cómo por ejemplo ventanas modales de logueo, de públicidad, ventanas modales para dar avisos. Otra interacción de mandar código html hacia otro elemento del DOM podria ser comportamientos del estado hover de alguna "tarjeta", loaders... que en vez de ser cargados dinamicamente en la misma aplicación, tengamos un nodo vacío en nuestro `index.html` esperando que cáda vez que hagamos una petición, se cargue un loader, por ejemplo.
Otro ejemplo serian los tool-tips, cáda vez que pasemos el mouse sobre ellos nos aparezca una ventana modal u instrucciones. En estos casos, nos convendría poseer los elementos en el DOM real, y ahí cargarlos.

## Para esto nos sirve los portales.
Copiamos y pegamos el archivo Modal.jsx y le cambiamos el nombre a "ModalPortal", además del nombre de la función y su exportación.
Luego en Modals creamos una nueva variable de estado y asignamos un nuevo botón y componente ModalPortal con sus respectivas props.
```js
const [isOpenPortal,openModalPortal,closeModalPortal] = useModal(false)
...
<button onClick={openModalPortal}>Modal Contacto</button>
<ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
    <ContactForm />
</ModalPortal>
```
Para el uso de los portales debemos de importar ReactDOM en nuestro archivo ModalPortal, y además necesitamos la estructura que viene en nuestro index.js o main.jsx en mi caso.
Existen diferencias de escritura para el renderizaco y creación de elementos en comparación con mi main.jsx y el index.js de Jon, cabe destacar que yo utilicé vite y no create-react-app. Se debe de devolver un sólo elemento, código jsx.
```js
 <p>Mi render:</p>
ReactDOM.createRoot(document.getElementById('modal')).render( <></> )
<p>Render de Jon:</p>
ReactDom.createPortal(<></>,document.getelementById('modal'))
```
La que me funcionó fue el método de Jon.

---
# FIN DE EJERCICIOS DE LOS CONCEPTOS BÁSICOS.
---# ReactEjercicios-by-JonMircha-1
