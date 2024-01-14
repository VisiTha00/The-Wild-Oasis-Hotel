import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not fetch the cabins data");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Could not delete the cabin data");
  }
}

export async function createAndEditCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://fzkayxrywwymclmyenqf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //Creating a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imageURL }])
    .select()
    .single();
  if (error) {
    console.log(error);
    throw new Error("Could not create a new cabin");
  }

  //if the creating of a cabin is successful, then upload an image to the storage
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (StorageError) {
    const { error } = await supabase.from("cabins").delete().eq("id", data.id);
    console.log(StorageError);
    throw new Error("There was an error while uploading the image");
  }
  return data;
}
