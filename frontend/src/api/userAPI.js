import axios from 'axios'
import { jwtDecode } from '@/utils/jwtToken';
import { router } from "@/main.js"
export const apiUrl = process.env.VUE_APP_API

export const refreshApi = () => {
  const tokenTime = sessionStorage.getItem("access-token") 
                      ? jwtDecode(sessionStorage.getItem("access-token")).exp
                      : Math.floor(new Date().getTime() / 1000) - 1;
  const nowTime = Math.floor(new Date().getTime() / 1000);
  // 토큰만료시간(tokenTime)이 지금 시간보다 작으면 refresh토큰 실행
  if (nowTime > tokenTime) {
    const refreshToken = localStorage.getItem("refresh-token")
    return axios({
      method: "post",
      url: apiUrl + "/auth/refresh",
      headers: {
        "refresh-token": refreshToken
      }
    })
      .then(response => {
        sessionStorage.setItem("access-token", response.headers["access-token"]);
        localStorage.setItem("refresh-token", response.headers["refresh-token"]);
      }).catch(error => {
        alert(error.message)
        sessionStorage.clear();
        localStorage.clear();
        router.push('/login')
      });
  }
}

export const loginApi = (id_token) => {
  const axiosData = {
    method: "post",
    url: apiUrl + "/auth/google/login",
    data: {
      token: id_token
    }
  };

  return axios(axiosData)
    .then(response => {
      return response;
    }).catch(error => {
      return error
    });
}

export async function getCodeCombo(arrList = []) {
  try {
    await refreshApi();
    await Promise.all(arrList.map( async obj => {
      const axiosData = {
        method: "get",
        url: apiUrl + obj[0],
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);

      if (typeof obj[2] === 'object') {
        const All = {
          [obj[2].key]: obj[2].title,
          [obj[2].value]: null,
        }
        respObj.data.data.unshift(All)
      }

      this[obj[1]] = respObj.data.data;
      return respObj;
    }));
  } catch (err) {
    console.error(err);
  }
}

export const pushComma = (val , defaultValue = "0") => {
  if (val) {
    return String(val).replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return defaultValue;
  }
}



export const easyAxios = async (authCheck = true, method, path, payload = {}) => {
  if (authCheck) {
    await refreshApi();
  }
  const options = {
    method,
    url: apiUrl + path,
    headers: {
      Authorization: sessionStorage.getItem('access-token')
    },
  }
  if (method === 'get') {
    options.params = payload;
  } else {
    options.data = payload;
  }
  return axios(options);
}