/**
 * Utility to handle email links with a preference for Microsoft Outlook.
 */
import { toast } from 'sonner';

/**
 * Utility to handle email links with a strong preference for the Microsoft Outlook APP.
 */
export const openInOutlook = (email: string, subject?: string, body?: string) => {
  const subjectParam = subject ? `&subject=${encodeURIComponent(subject)}` : '';
  const bodyParam = body ? `&body=${encodeURIComponent(body)}` : '';
  
  // Standard mailto link - This is the most compatible way to open the mail app
  // on ANY device (iPhone, Android, Windows, Mac).
  // If the user has Outlook set as their default mail app, this will open Outlook.
  const mailtoUrl = `mailto:${email}?${subjectParam.replace('&', '')}${bodyParam}`;

  // Office 365 Web Deep Link - Guaranteed to open Outlook (Web)
  const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}${subjectParam}${bodyParam}`;

  // To avoid "Host unknown url" errors, we use the standard mailto protocol.
  // We also provide a fallback to the web version if the window doesn't lose focus.
  
  window.location.href = mailtoUrl;

  // Fallback Mechanism
  // If the mail app doesn't open (e.g. no mail app configured), 
  // we open the Outlook Web version in a new tab after a short delay.
  setTimeout(() => {
    if (document.hasFocus()) {
      window.open(outlookWebUrl, '_blank');
    }
  }, 1500);
};

/**
 * Copies text to clipboard and returns success status
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
