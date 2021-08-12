import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tareas: []
        }
        this.enviarDatos = this.enviarDatos.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //  POST DATA
    enviarDatos(e) {
        if (this.state._id) {//realiza accion put
            fetch(`/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Updated' });
                    this.setState({ title: '', description: '', _id: '' });
                    e.target.reset();
                    this.obtenerDatos();
                })
        } else {//realiza accion post
            if ((this.state.title === '') || (this.state.description === ''))
                M.toast({ html: 'Load the form' })
            else {
                fetch('/task', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        M.toast({ html: 'Note Saved' });
                        this.obtenerDatos();
                    })
                    .catch(err => console.log(err));
            }
            e.target.reset();
        }
        e.preventDefault();
    }

    //Almacena los datos de las entradas del del formulario
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {//este metodo se ejecuta cuando se carga la pagina
        this.obtenerDatos();
    }

    //GET DATA
    obtenerDatos() {
        fetch('/task')
            .then(res => res.json())
            .then(data => {
                this.setState({ tareas: data })
            });
    }

    //DELETE ROW
    deleteRow(id) {
        if (confirm('Are you sure to want to delete it?')) {
            fetch(`/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Deleted' });
                    this.obtenerDatos();
                })
        }
    }

    //UPDATE ROW
    updateRow(id) {
        fetch(`/task/${id}`)
            .then(res => res.json())
            .then(data => {
                M.toast({ html: 'Insert new data' });
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
            });
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper purple darken-4">
                        <a href="#!" class="brand-logo">NOTES</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <form action="post" onSubmit={this.enviarDatos}>
                                <h6 className="white-text">Cargar Notas</h6>
                                <input placeholder="Ingresar titulo" className="indigo-text input-field" name="title" onChange={(e) => this.handleChange(e)} />
                                <textarea placeholder="Ingresar descripcion" className="indigo-text" name="description" onChange={(e) => this.handleChange(e)} />
                                <button type="submit" className="waves-effect waves-light  btn-small"><i className="material-icons right">send</i>Enviar</button>
                            </form>
                        </div>
                        <div className="col s7">
                            <table className="centered responsive-table">
                                <thead>
                                    <tr className="light-blue-text lighten-5-text">
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody className="green-text accent-1-text">
                                    {
                                        this.state.tareas.map(item =>
                                            <tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <button onClick={() => this.updateRow(item._id)}><i className="material-icons">edit</i></button>
                                                    <button onClick={() => this.deleteRow(item._id)}><i className="material-icons">delete</i></button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;
