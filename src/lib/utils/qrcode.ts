import QRCode from "qrcode";

/**
 * Generates a Data URI string containing a base64 encoded PNG of the QR code.
 */
export async function generateQrDataUrl(
  text: string,
  options?: QRCode.QRCodeToDataURLOptions
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      ...options,
    });
  } catch (err) {
    console.error("Failed to generate QR code", err);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * Generates an SVG string representation of the QR code.
 */
export async function generateQrSvg(
  text: string,
  options?: QRCode.QRCodeToStringOptions
): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: "svg",
      width: 300,
      margin: 2,
      ...options,
    });
  } catch (err) {
    console.error("Failed to generate QR code SVG", err);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * Utility to download the generated QR Code as a PNG file.
 */
export async function downloadQrAsPng(text: string, filename: string = "qrcode.png") {
  const dataUrl = await generateQrDataUrl(text);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Utility to download the generated QR Code as an SVG file.
 */
export async function downloadQrAsSvg(text: string, filename: string = "qrcode.svg") {
  const svgString = await generateQrSvg(text);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
