'use strict';

function postUser(editFields) {
    return fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify(editFields),
    }).then(response => {
        return {
            statusCode: response.status,
        };
    }).catch((error) => {
        return {
            error: error,
        };
    });
}

function getUser(userId) {
    let statusCode;
    return fetch(`/api/user?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        statusCode = response.status;
        return response.json();
    }).then(parsedJson => {
        return {
            statusCode,
            parsedJson,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function getMeet(meetId) {
    let statusCode;
    return fetch(`/api/meet?meetId=${meetId}`, {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        statusCode = response.status;
        return response.json();
    }).then(parsedJson => {
        return {
            statusCode,
            parsedJson,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function postMeet(editFields) { // редактирование митинга
    return fetch('/api/meet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify(editFields),
    }).then(
        (response) => {
            return {
                statusCode: response.status,
            };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function getMeetings(obj) {
    let params = '?';
    Object.keys(obj).forEach(key => {
        params += `${key}=${obj[key]}&`
    });

    if (params === '?') {
        params = '';
    } else {
        params = params.slice(0, params.length - 1);
    }

    let statusCode;
    return fetch(`/api/meetings${params}`, {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        statusCode = response.status;
        return response.json();
    }).then(parsedJson => {
        return {
            statusCode,
            parsedJson,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function getPeople(pageNum) {
    let statusCode;
    return fetch(`/api/people?pageNum=${pageNum}`, {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        statusCode = response.status;
        return response.json();
    }).then(parsedJson => {
        return {
            statusCode,
            parsedJson,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function postPhoto(data) {
    return fetch('/api/images', {
        method: 'POST',
        credentials: 'include',
        body: data,
    }).then(response => {
        return {
            statusCode: response.status,
        };
    }).catch(error => {
        return {
            error: error
        };
    });
}

const postLogin = async (login, password) => {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then(response => {
        return {
            statusCode: response.status,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

function getMe() {
    let statusCode;
    return fetch('/api/me', {
        method: 'GET',
        credentials: 'include'
    }).then(
        (response) => {
            statusCode = response.status;
        return response.json();
    }).then(parsedJson => {
        return {
            statusCode: statusCode,
            body: parsedJson,
        }
    }).catch(error => {
        return {
            error: error
        }
    });
}

function postSignUp(login, password) {
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then(
        (response) => {
            return {
                statusCode: response.status,
            };
    }).catch(error => {
        return {
            error: error
        };
    });
}

function postSignOut() {
    return fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
    }).then(response => {
        return {
            statusCode: response.status,
        };
    }).catch(error => {
        return {
            error: error
        };
    });
}

function postMeeting(fields) {  // новый митинг
    return fetch('/api/meeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify(fields),
    }).then(response => {
        return {
            statusCode: response.status,
        };
    }).catch(error => {
        return {
            error: error,
        };
    });
}

export {
    postUser,
    getPeople,
    getUser,
    getMeet,
    postMeet,
    getMeetings,
    postPhoto,
    postLogin,
    getMe,
    postSignUp,
    postSignOut,
    postMeeting
};
