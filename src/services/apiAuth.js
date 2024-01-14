import supabase from "./supabase";

export async function signUpUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) {
    throw new Error("There was an error while creating the user account");
  }
  return data;
}

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Could not login user");
  }
  // console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // Here getSession() returns a object like this -> {data: {session :...}, error: null}
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser(); //supabase.auth.getUser(data.session.access_token);
  if (error) {
    throw new Error(error.message);
  }
  console.log("UserData", data);
  return data?.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  //Update the user profile with the new data
  let updateData;
  if (fullName) {
    updateData = { data: { fullName } };
  }
  if (password) {
    updateData = { password };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) {
    return data;
  }

  //Upload the avatar to the storage
  const avatarName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  //Update the user profile with the new avatar
  //
  const { data: newData, error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://fzkayxrywwymclmyenqf.supabase.co/storage/v1/object/sign/avatars/${avatarName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }
  console.log("newData", newData);
  return newData;
}
