import { apiClient } from "../../Api/ApiClient";

//==============================ADD NEW WARD============================
//add a new ward
export const addWard = async (value) => {
  try {
    // console.log("Add a ward data");
    // console.log(value);
    const response = await apiClient.post("/ward/add-ward", value);
    return response.status;
  } catch (err) {
    throw new Error("Couldn't add a new ward");
  }
};

//retirve available matrons
export const retrieveMatronNics = async (username) => {
  try {
    const response = await apiClient.get("/ward/get-all-matrons");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve matron nics");
  }
};

//=======================ADD A STAFF MEMBER==============================

//add a new staff member
export const addStaff = async (value) => {
  try {
    // console.log(value);
    const response = await apiClient.post("/add-staff", value);
  } catch (err) {
    throw new Error("Couldn't add a new staff member");
  }
};

//retrieve all ward numbers to add a staff member
export const retrieveWardNumbers = async () => {
  try {
    const response = await apiClient.get("/get-ward-numbers");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retieve ward numbers");
  }
};

//=========================BASIC WARD DETAILS===========================

//retieve all ward names relevant to a matron
export const retrieveWardNames = async (username) => {
  try {
    const response = await apiClient.get(`/get-ward-names/${username}`);
    // console.log("ward names in service file");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve ward names");
  }
};

//retreive selected basic ward data
export const retrieveWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-ward/${wardName}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//retreive basic ward data of the logged user
export const retrieveWardDataOfLoggedUser = async (username) => {
  try {
    console.log();
    const response = await apiClient.get(`/show-logged-user-ward/${username}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//=========================EDIT WARD DATA==============================

//retrive full ward details for edit
export const retrieveBasicWardData = async (wardName) => {
  try {
    console.log("edit ward details" + wardName);
    const response = await apiClient.get(`/show-fullward/${wardName}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//retrive full ward details for edit when sister log
export const retrieveBasicWardDataSister = async (username) => {
  try {
    console.log("edit ward details" + username);
    const response = await apiClient.get(
      `/show-fullward-By-Sister/${username}`
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data");
  }
};

//send edited ward details values
export const sendEditedWardDetails = async (values) => {
  try {
    // console.log("new ward details values");
    const response = await apiClient.put("/ward-sister-update", values);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Couldn't edit ward details");
  }
};

//retirve available sisters
export const retrieveSistersNics = async (username) => {
  try {
    const response = await apiClient.get("/show-available-sisters");
    return response.data;
  } catch (err) {
    throw new Error("Couldn't retrieve sister nics");
  }
};
