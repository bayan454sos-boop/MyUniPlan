/**
 * Utility to handle email links with a preference for Microsoft Outlook.
 */
export const openInOutlook = (email: string, subject?: string, body?: string) => {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const queryString = params.length > 0 ? `?${params.join('&')}` : '';

  const mailtoUrl = `mailto:${email}${queryString}`;
  
  // On mobile devices, we can try the ms-outlook protocol
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    const outlookProtocolUrl = `ms-outlook://compose?to=${email}${queryString.replace('?', '&')}`;
    window.location.href = outlookProtocolUrl;
    
    // Fallback to standard mailto after a short delay if the protocol isn't handled
    setTimeout(() => {
      if (document.hasFocus()) {
        window.location.href = mailtoUrl;
      }
    }, 500);
  } else {
    // On desktop, mailto: is the standard way to trigger the default mail client.
    // To ensure this opens Outlook, the user must set Outlook as their default mail app in system settings.
    window.location.href = mailtoUrl;
  }
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
