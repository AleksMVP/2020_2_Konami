'use strict';

function getCSRF() {
    return fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        return {
            csrf: response.headers.get('Csrf-Token'),
        };
    }).catch(error => {
        return {
            error,
        };
    });
}

function postUser(editFields) {
    return getCSRF().then(obj => {
        return fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Csrf-Token': obj.csrf,
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
    });
}

function getUser(userId) {
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
    return getCSRF().then(obj => {
        return fetch('/api/meet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Csrf-Token': obj.csrf,
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
    return getCSRF().then(obj => {
        return fetch('/api/images', {
            method: 'POST',
            headers: {
                'Csrf-Token': obj.csrf,
            },
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
    });
}

const postLogin = async (login, password) => {
    return getCSRF().then(obj => {
        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Csrf-Token': obj.csrf,
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
    });
}

function getMe() {
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
    return getCSRF().then(obj => {
        return fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Csrf-Token': obj.csrf,
            },
            credentials: 'include',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) => {
            return {
                statusCode: response.status,
            };
        }).catch(error => {
            return {
                error: error
            };
        });
    });
}

function postSignOut() {
    return getCSRF().then(obj => {
        return fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Csrf-Token': obj.csrf,
            },
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
    });
}

function postMeeting(fields) {  // новый митинг
    return getCSRF().then(obj => {
        return fetch('/api/meeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Csrf-Token': obj.csrf,
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
