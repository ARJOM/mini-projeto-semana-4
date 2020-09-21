import React, {useState} from 'react';
import api from './services/api'

export default function App() {
    const [search, setSearch] = useState('');
    const [svg, setSvg] = useState('');
    const [viewBox, setViewBox] = useState('');

    function handleSearch(e) {
        e.preventDefault();

        api.get(`/getSvg/${search}`)
            .then(response => setSvg(response.data[0]['st_assvg']))
            .catch(err => alert(err));

        api.get(`getViewBox/${search}`)
            .then(response => setViewBox(response.data[0]['getviewbox']))
            .catch(err => alert(err));

    }
    return (
        <div>
            <div className='search'>
                <form onSubmit={handleSearch}>
                    <input type='text' onChange={event => setSearch(event.target.value)}/>
                    <input type='submit' value='Enviar'/>
                </form>
            </div>
            <div className='content'>
                <svg width='200' height='200' viewBox={viewBox}>
                    <path
                        d={svg}
                        stroke='#212121'
                        strokeWidth='0.001'
                    />
                </svg>
            </div>
        </div>
    );
}
