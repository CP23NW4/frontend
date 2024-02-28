export const getUser = async (url, successMessage) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
  
      if (res.status === 200 || res.status === 201) {
        console.log("Successful");
      } else if (res.status === 400) {
        const errorResponse = await res.json();
      if (errorResponse.errors && errorResponse.errors.length > 0) {
        const errorMessage = errorResponse.errors[0].msg;
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Error: Bad request");
      }
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