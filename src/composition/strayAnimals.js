export const getAnimalPosts = async (url, successMessage) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
  
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        console.log("Successful", data);
        return data; 
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
        window.location.hash = '#/sign-in'
      } else if (res.status === 404) {
        console.log(res.status);

        window.location.hash = '#/notfound'
      } else {
        console.log("Error, something went wrong");
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };