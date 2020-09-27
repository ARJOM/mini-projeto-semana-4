import React, {useState} from 'react';
import api from './services/api'

export default function App() {
    const [search, setSearch] = useState('');
    const [svg, setSvg] = useState('');
    const [viewBox, setViewBox] = useState(null);
    const [stateSvg, setStateSvg] = useState('');

    async function handleSearch(e) {
        e.preventDefault();

        let estado = await api.get(`/getStateName/${search}`);
        estado = estado.data.nome;

        api.get(`getSvg/${search}`)
            .then(response => {
                setSvg(response.data.st_assvg);
            })
            .catch(err => alert(err));

        api.get(`getStateSvg/${estado}`)
            .then(response => {
                setStateSvg(response.data.st_assvg);
            })
            .catch(err => alert(err));

        api.get(`getStateViewBox/${estado}`)
            .then(response => {
                setViewBox(response.data.getstateviewbox);
            })
            .catch(err => alert(err));

    }
    return (
        <div className='container'>
            <div className='search'>
                <form onSubmit={handleSearch} className='form'>
                    <label htmlFor='city'>Cidade:</label>
                    <input type='text' name='city' onChange={event => setSearch(event.target.value)}/>
                    <input type='submit' value='Enviar'/>
                </form>
            </div>
            <div className='content'>
                <svg width='400' height='400' viewBox={viewBox}>
                    <path
                        d={stateSvg}
                        fillOpacity={0}
                        stroke='#000000'
                        strokeWidth='0.007'
                    />
                    <path
                        d={svg}
                    />
                </svg>
            </div>
        </div>
    );
}
