export async function startInterview(data)
{
    try {
        const response = await fetch('http://localhost:4200/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}