import { Circles } from 'react-loader-spinner'

function Spinner() {
    return (
        <div className='spinner-container'>
            <Circles
                height="80"
                width="80"
                color="#e76f51"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}

export default Spinner;