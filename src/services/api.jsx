const API_URL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/job_posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const authSignin = async (signinCredentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinCredentials),
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const authSignup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};


export const createJobPost = async (jobPostData, token) =>{
  try{
    const response = await fetch(`${API_URL}/job_posts`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobPostData)

    })
    const data = await response.json();
    return data;
  }catch(error){
    console.error('Error creating job post in:', error);
    throw error;

  }
}
export const updateJobPost = async (jobPostData, token, id) =>{
  try{
    const response = await fetch(`${API_URL}/job_posts/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobPostData)

    })
    const data = await response.json();
    return data;
  }catch(error){
    console.error('Error updating job post in:', error);
    throw error;

  }
}

export const deleteJobPost = async (token, id) => {
  try {
    const response = await fetch(`${API_URL}/job_posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete job post');
    }

    return response.json(); 
  } catch (error) {
    console.error('Error deleting job post:', error);
    throw error;
  }
};

export const getUserById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

