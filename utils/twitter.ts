export async function checkTwitterUsername(username: string): Promise<string> {
  try {
    const response = await fetch(`/api/twitter-check?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.formattedData;
  } catch (error) {
    console.error('Error checking Twitter username:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

