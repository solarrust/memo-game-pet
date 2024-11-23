interface randomIntegerProps {
  min: number;
  max: number;
}

export function randomInteger({ min, max }: randomIntegerProps = { min: 0, max: 1000 }): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface fetchImagesProps {
  limit: number;
}

export async function fetchImages({ limit }: fetchImagesProps = { limit: 6 }) {
  const result = [];

  while (result.length < limit) {
    const random = randomInteger();

    try {
      const response = await fetch(`https://picsum.photos/id/${random}/info`);

      if (response.ok) {
        const data = await response.json();
        result.push(data.download_url);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return result;
}
