import SingleCountry from "./SingleCountry";

const Countries = ({ countriesList, country, showContentHandler }) => {
    if(countriesList !== undefined) {
        if(countriesList.length > 10){
            return (
                <div>
                    <p>Too many matches, especify another filter</p>
                </div>
            )
        }else if(countriesList.length > 1) {
            return (
                countriesList.map((data, index) => {
                    return(
                        <div className="countries" key={index}>
                            <p>{data.name.common}</p>
                            <button id={index} value={data.name.common} onClick={showContentHandler}>{(country.name === data.name.common && country.isActive) ? 'Hide' : 'Show'}</button>
                            {(country.name === data.name.common && country.isActive) ? <SingleCountry data={data} /> : null}
                        </div>
                    )
                })
            )
        } else if(countriesList.length === 1) {
            return (
                <div>
                    <SingleCountry data={countriesList[0]} />
                </div>
            )
        }
    }
}

export default Countries;
