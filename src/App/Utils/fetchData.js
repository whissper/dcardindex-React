
const REST_SERVICE_URL = '/dcard/'; //'http://localhost:8889/dcard/';

async function fetchData(serviceMethod, data, startLoad = () => {}, stopLoad = () => {}) {

    let response = null;

    const url = REST_SERVICE_URL + serviceMethod;

    startLoad();

    try {
        response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin', //'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    } catch(error) {
        stopLoad();
        return 'ERROR_FETCH|' + error;
    }

    if (response.ok) {
        const text = await response.text();
        stopLoad();
        return text;
    } else {
        stopLoad();
        return 'ERROR_HTTP|' + response.status + ' -- ' + response.statusText;
    }

}

export default fetchData;
export { REST_SERVICE_URL };
