const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=Subhadip%20Jana&g=Subhadipjana95&x=Subhadip53874&l=subhadipjana095&i=https%3A%2F%2Fres.cloudinary.com%2Fdfjuuwtr6%2Fimage%2Fupload%2Fv1764255716%2FSUbhadip_Banner_qy3fcy.png&p=subhadipjana95.github.io%2FSubhadip-Portfolio&z=aa623";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string, retries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BentoResponse = (await response.json()) as BentoResponse;
      return data.url;
    } catch (error) {
      if (attempt === retries) {
        console.error("Error fetching Bento URL:", error);
        throw error;
      }
      // Wait 2 seconds before retrying
      await new Promise(res => setTimeout(res, 2000));
    }
  }
  throw new Error("Failed to fetch after retries");
};

// @ts-ignore
fetchBentoUrl(apiUrl);
