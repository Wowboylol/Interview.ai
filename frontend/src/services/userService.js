import { login } from "../../../backend/database";

export async function startInterview(data)
{
    try {
        const response = await fetch('http://localhost:4200/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}

export async function savePrompt(data)
{
    try {
        const response = await fetch('http://localhost:4200/api/create-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}

export async function loadPrompt(data)
{
    try {
        const response = await fetch('http://localhost:4200/api/view-prompts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}

export async function login(data)
{
    try {
        const response = await fetch('http://localhost:4200/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        return await response.json();
    }
    catch(err) {
        console.log(err);
    }
}