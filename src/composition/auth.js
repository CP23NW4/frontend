import Swal from 'sweetalert2';

export const handleAuthentication = async (url, data, successMessage) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
      method: "POST",
      body: data,
    });

    if (res.status === 200 || res.status === 201) {
      const token = await res.json();
      localStorage.setItem("token", token.token);
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
    } else if (res.status === 400) {
      console.log(res.status, error);
    } else if (res.status === 401) {
      Swal.fire({
        title: 'Error',
        text: 'Password Incorrect',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(res.status);
    } else if (res.status === 403) {
      Swal.fire({
        title: 'Error',
        text: 'Please log in again',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        localStorage.removeItem("token");
        window.location.hash = '#/sign-in';
      });
    } else if (res.status === 404) {
      Swal.fire({
        title: 'Error',
        text: 'Email/Username Not found',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(res.status);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error("Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

  export const handleSignup = async (url, data, successMessage) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}${url}`, {
        method: "POST",
        body: data,
      });
  
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.hash = '#/verify';
        });
      } else if (res.status === 400) {
        const errorResponse = await res.json();
        if (errorResponse.errors && errorResponse.errors.length > 0) {
          const errorMessage = errorResponse.errors[0].msg;
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Bad request',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else if (res.status === 401) {
        Swal.fire({
          title: 'Error',
          text: 'Password Incorrect',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log(res.status);
      } else if (res.status === 403) {
        Swal.fire({
          title: 'Unauthorized',
          text: 'Please log in again.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          localStorage.removeItem("token");
          router.push({
            name: "login",
          });
        });
      } else if (res.status === 404) {
        Swal.fire({
          title: 'Error',
          text: '404 Not found',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log(res.status);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error("Error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  