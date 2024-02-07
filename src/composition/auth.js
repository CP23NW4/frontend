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
        // const userId = decodedToken.PAYLOAD_FIELD;
        // localStorage.setItem("userId", userId);
        console.log(token.token);
        console.log(token);
        alert(successMessage);
        console.log("Operation successful");
  
        location.reload();
      } else if (res.status === 401) {
        alert("Password Incorrect");
        console.log(res.status);
      } else if (res.status === 403) {
        console.log("Go to login");
        localStorage.removeItem("token");
        router.push({
          name: "login",
        });
      } else if (res.status === 404) {
        router.push({
          name: "notfound",
        });
        console.log(res.status);
      } else {
        console.log("Error, something went wrong");
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
