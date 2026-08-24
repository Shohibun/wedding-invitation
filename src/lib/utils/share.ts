export async function shareLink(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.error("Error sharing", error);
      return false;
    }
  }
  return false;
}
