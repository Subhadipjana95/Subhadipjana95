import { promises as fs } from 'fs';

const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=Subhadip%20Jana&g=Subhadipjana95&x=Subhadip53874&l=subhadipjana095&i=https%3A%2F%2Fres.cloudinary.com%2Fdfjuuwtr6%2Fimage%2Fupload%2Fv1764255716%2FSUbhadip_Banner_qy3fcy.png&p=subhadipjana95.github.io%2FSubhadip-Portfolio&z=aa623";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string, retries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json"
        }
      });
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

const updateReadme = async () => {
  try {
    const newUrl = await fetchBentoUrl(apiUrl);
    console.log(`Fetched new URL: ${newUrl}`);

    const readmePath = 'README.md';
    let readmeContent = await fs.readFile(readmePath, 'utf8');

    // Regex to match the OpBento image markdown
    const regex = /!\[OpBento\]\((.*?)\)/;

    if (regex.test(readmeContent)) {
      readmeContent = readmeContent.replace(regex, `![OpBento](${newUrl})`);
      await fs.writeFile(readmePath, readmeContent);
      console.log('README.md updated successfully.');
    } else {
      console.error('OpBento image tag not found in README.md');
      process.exit(1);
    }

  } catch (error) {
    console.error('Failed to update README:', error);
    process.exit(1);
  }
}

updateReadme();

//ref: 95da7e209129c7436d98c2193b95a8270c7f35f9
