
// Helper function to convert a File/Blob to a base64 string
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // Remove the data URI prefix (e.g., "data:image/jpeg;base64,")
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper function to fetch an image from a URL and convert it to a base64 string
export const imageUrlToBase64 = async (url: string): Promise<{ base64: string, mimeType: string }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const mimeType = blob.type;
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({ base64, mimeType });
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image URL to base64:", error);
    throw error;
  }
};
