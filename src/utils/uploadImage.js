export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=b2fcd45ec468c9590cb03dea5d68205a",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.data && data.data.url) {
      return data.data.url;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
