const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=Subhadip%20Jana&g=Subhadipjana95&x=Subhadip53874&l=subhadipjana095&i=https%3A%2F%2Fres.cloudinary.com%2Fdfjuuwtr6%2Fimage%2Fupload%2Fv1764255716%2FSUbhadip_Banner_qy3fcy.png&p=subhadipjana95.github.io%2FSubhadip-Portfolio&z=aa623";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string): Promise<string> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BentoResponse = (await response.json()) as BentoResponse;
    return data.url;
  } catch (error) {
    console.error("Error fetching Bento URL:", error);
    throw error;
  }
};

// @ts-ignore
fetchBentoUrl(apiUrl);
