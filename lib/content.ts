export type ContentBlock = {
  id: number;
  page: string;
  section: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  is_active: boolean;
  sort_order: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHomeContent(): Promise<ContentBlock[]> {
  const response = await fetch(`${API_URL}/api/v1/content/home`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load website content.");
  }

  const data = await response.json();

  return data.data ?? [];
}