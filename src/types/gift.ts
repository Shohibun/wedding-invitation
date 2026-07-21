export interface GiftAccount {
  id: string;
  bankName: string; // e.g., "BCA", "Mandiri", "GoPay"
  accountNumber: string;
  accountName: string;
  isEWallet?: boolean; // Flag to easily show QR code or different icons
  qrCodeUrl?: string; // For e-wallets like QRIS
}
