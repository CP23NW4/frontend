import { useRouter } from 'vue-router';

export const handleAuthentication = async (url, data, successMessage) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (res.status === 200 || res.status === 201) {
        const token = await res.json();
        localStorage.setItem("token", token.token);
        console.log(token.token);
        console.log(token);
        alert(successMessage);
        console.log("Successful");
        location.reload();
      } else if (res.status === 400) {
        console.log(res.status, error);
      }else if (res.status === 401) {
        alert("Password Incorrect");
        console.log(res.status);
      } else if (res.status === 403) {
        console.log("Go to login");
        localStorage.removeItem("token");
        router.push({
          name: "login",
        });
      } else if (res.status === 404) {
        alert("Email/Username Not found");
        console.log(res.status);
      } else {
        console.log("Error, something went wrong");
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  export const handleSignup = async (url, data, successMessage) => {
    const router = useRouter();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (res.status === 200 || res.status === 201) {
        alert(successMessage);
        console.log("Successful");
        location.reload();
        router.push({ name: "login" });
      } else if (res.status === 400) {
        const errorResponse = await res.json();
      if (errorResponse.errors && errorResponse.errors.length > 0) {
        const errorMessage = errorResponse.errors[0].msg;
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Error: Bad request");
      }
      }else if (res.status === 401) {
        alert("Password Incorrect");
        console.log(res.status);
      } else if (res.status === 403) {
        console.log("Go to login");
        localStorage.removeItem("token");
        router.push({
          name: "login",
        });
      } else if (res.status === 404) {
        alert("404 Not found");
        console.log(res.status);
      } else {
        console.log("Error, something went wrong");
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

