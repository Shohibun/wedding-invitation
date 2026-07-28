export const ReportFormatter = {
  formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString();
  },

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  },
};
