import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let headers = new Headers( {
        "Content-Type": "application/json"
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if( accessToken && accessToken !== null ) {
        headers.append("Authorization", "Bearer " + accessToken);
    }


    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if( request ) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        console.log("csh: response status : " + response.status)
        if( response.status === 200 ) {
            return response.json();
        } else if( response.status === 403) { // forbidden이 리턴되면...
            window.location.href = "/login";
        } else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO) 
        .then((response) => {
            //console.log("response: ", response);
            //alert("로그인 토큰: " + response.token);
            if( response.token) { // 로그인 성공하면
                localStorage.setItem('ACCESS_TOKEN', response.token);
                window.location.href = "/"; // 투두리스트페이지로 이동
            }
        });
}

// 로그아웃 함수
export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login"
}

// 계정 생성 함수
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}