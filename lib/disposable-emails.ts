export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  const disposableDomains: string[] = [
    'mailinator.com', 'temp-mail.org', 'tempmail.com', 'guerrillamail.com',
    'yopmail.com', '10minutemail.com', 'anonmail.net', 'fakemail.com',
    'maildrop.cc', 'getnada.com', 'throwawaymail.com', 'dispostable.com',
    'spamgourmet.com', 'mohmal.com', 'temp-mail.io', 'mail.tm',
    'disposable.email', 'harmful.email', 'sharklasers.com', 'grr.la'
  ];

  return disposableDomains.includes(domain);
}
