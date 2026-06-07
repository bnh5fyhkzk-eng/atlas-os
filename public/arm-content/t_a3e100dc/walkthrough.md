# iCloud CalDAV + Sign-in-with-Apple OAuth Flow 2026
## Code-Grade Walkthrough for NextJS

This document provides a step-by-step guide to integrating iCloud CalDAV and Sign-in-with-Apple (SIWA) in a NextJS application, as of 2026.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Sign-in-with-Apple Setup](#sign-in-with-apple-setup)
   - [Generating Apple Keys](#generating-apple-keys)
   - [Configuring SIWA in NextJS](#configuring-siwa-in-nextjs)
3. [iCloud CalDAV Setup](#icloud-caldav-setup)
   - [Generating App-Specific Password](#generating-app-specific-password)
   - [Accessing CalDAV Endpoints](#accessing-caldav-endpoints)
4. [Integrated Flow Example](#integrated-flow-example)
5. [Troubleshooting & Best Practices](#troubleshooting--best-practices)

---

## Prerequisites
- Node.js >= 18.x
- Next.js >= 13.4 (using App Router)
- Apple Developer Account
- iCloud Account (for CalDAV)
- Basic understanding of OAuth 2.0 and CalDAV

## Sign-in-with-Apple Setup
### Generating Apple Keys
1. Go to [Apple Developer Account](https://developer.apple.com/account/) → Certificates, Identifiers & Profiles → Keys.
2. Click the **+** button to create a new key.
3. Check **Sign in with Apple** and configure:
   - Key Name: `Uplift AI SIWA Key`
   - Primary App ID: Select your App ID (or create one if needed)
4. Click **Save** and then **Download** the key (`.p8` file). **Store this securely** – it’s only shown once.
5. Note the **Key ID** and your **Apple Team ID** (from Membership section).

### Configuring SIWA in NextJS
We'll use `next-auth` for simplicity, but you can implement manually.

1. Install dependencies:
   ```bash
   npm install next-auth @next-auth/jwt
   ```
2. Create `[...nextauth].js` in `pages/api/auth/` (or `app/api/auth/[...nextauth]/route.js` for App Router).

   **Example for Pages Router (`pages/api/auth/[...nextauth].js`):**
   ```javascript
   import NextAuth from "next-auth";
   import AppleProvider from "next-auth/providers/apple";

   export const authOptions = {
     providers: [
       AppleProvider({
         clientId: process.env.APPLE_CLIENT_ID, // Services ID
         clientSecret: {
           appleId: process.env.APPLE_TEAM_ID,
           privateKey: process.env.APPLE_PRIVATE_KEY,
           keyId: process.env.APPLE_KEY_ID,
         },
       }),
     ],
     callbacks: {
       async jwt({ token, account }) {
         if (account) {
           token.accessToken = account.access_token;
           token.appleId = account.providerAccountId; // User's Apple ID (hidden email)
         }
         return token;
       },
       async session({ session, token }) {
         session.user.appleId = token.appleId;
         session.accessToken = token.accessToken;
         return session;
       },
     },
   };
   export default NextAuth(authOptions);
   ```

   **For App Router (`app/api/auth/[...nextauth]/route.js`):**
   ```javascript
   import NextAuth from "next-auth";
   import AppleProvider from "next-auth/providers/apple";

   export const authOptions = {
     providers: [
       AppleProvider({
         clientId: process.env.APPLE_CLIENT_ID,
         clientSecret: {
           appleId: process.env.APPLE_TEAM_ID,
           privateKey: process.env.APPLE_PRIVATE_KEY,
           keyId: process.env.APPLE_KEY_ID,
         },
       }),
     ],
     callbacks: {
       async jwt({ token, account }) {
         if (account) {
           token.accessToken = account.access_token;
           token.appleId = account.providerAccountId;
         }
         return token;
       },
       async session({ session, token }) {
         session.user.appleId = token.appleId;
         session.accessToken = token.accessToken;
         return session;
       },
     },
   };

   export default NextAuth(authOptions);
   ```

3. Set environment variables in `.env.local`:
   ```
   APPLE_CLIENT_ID="com.upliftai.coachapp"   # Your Services ID
   APPLE_TEAM_ID="YOUR_TEAM_ID"
   APPLE_KEY_ID="YOUR_KEY_ID"
   APPLE_PRIVATE_KEY="[REDACTED PRIVATE KEY]"
   NEXTAUTH_SECRET="your..."
   NEXTAUTH_URL="http..."
   ```
   > **Note**: The private key must include newlines. Use `\n` in the env var or store it in a file and reference it.

4. Add the SIWA button:
   ```jsx
   import { getProviders } from "next-auth/react";
   import { SignInWithApple } from '@next-auth/apple-provider'; // Or use a custom button

   export default function SignIn() {
     const providers = getProviders();
     return (
       <div>
         {providers.apple && (
           <SignInWithApple
             provider={providers.apple}
             callbackUrl="/api/auth/signin/apple"
           />
         )}
       </div>
     );
   }
   ```

### iCloud CalDAV Setup
#### Generating App-Specific Password
1. Go to [appleid.apple.com](https://appleid.apple.com) → Security → App-Specific Passwords.
2. Generate a password for your NextJS app (label: `Uplift AI CalDAV`).
3. **Copy and store the password securely** – it’s only shown once.

#### Accessing CalDAV Endpoints
iCloud CalDAV uses the following endpoints:
- **Principal URL**: `https://caldav.icloud.com/`
- **User Principal**: `https://caldav.icloud.com/<username>/principal/`
- **Calendar Home**: `https://caldav.icloud.com/<username>/calendars/`

Replace `<username>` with your iCloud email (without `@icloud.com` or `@me.com`).

**Example: Listing Calendars**
```javascript
import { parse } from 'xml2js';

export async function getCalendars(accessToken) {
  const username = process.env.ICLOUD_USERNAME; // e.g., "john.appleseed"
  const password = process.env.ICLOUD_APP_SPECIFIC_PASSWORD; // App-specific password

  const response = await fetch(`https://caldav.icloud.com/${username}/calendars/`, {
    method: 'PROPFIND',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      'Content-Type': 'application/xml; charset=utf-8',
      'Depth': '1',
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<propfind xmlns="DAV:">
  <prop>
    <resourcetype />
    <displayname />
  </prop>
</propfind>`
  });

  if (!response.ok) throw new Error(`CalDAV error: ${response.status}`);

  const xml = await response.text();
  const parsed = await parseStringPromise(xml);
  // Process parsed.response...multistatus.response to extract calendar hrefs and displaynames
  return parsed;
}
```

> **Note**: For production, consider using a CalDAV library like `jsdav-client` or `sabre/dav` to handle XML parsing and WebDAV operations.

### Integrated Flow Example
Here’s how you might combine both in a coach app:
1. User signs in with Apple via NextAuth.
2. On successful sign-in, store the Apple access token (if needed for Apple services) and the user’s Apple ID (hidden email).
3. Prompt the user to link their iCloud account (separate from Apple ID) for CalDAV access.
   - Use the iCloud username and app-specific password to access CalDAV.
   - Store the CalDAV credentials encrypted in your database (linked to the user).
4. Use the CalDAV credentials to sync the user’s calendars (e.g., for scheduling coaching sessions).

### Troubleshooting & Best Practices
- **SIWA**:
  - **Invalid private key**: Ensure the key is in PEM format and includes the header/footer.
  - **Missing Services ID**: The `clientId` must be a Services ID (not a Bundle ID) created under Identifiers → Services IDs.
  - **Key expiration**: Apple keys don’t expire, but you can revoke and generate new ones if compromised.
- **CalDAV**:
  - **App-specific password required**: Regular iCloud password won’t work if 2FA is enabled (which it should be).
  - **URL correctness**: Double-check the username format (no domain, just the part before `@`).
  - **Rate limiting**: iCloud may throttle excessive requests; cache calendar data where possible.
- **Security**:
  - Never expose Apple private keys or app-specific passwords in client-side code.
  - Use HTTPS in production (NextJS provides this in Vercel or custom servers).
  - Encrypt sensitive tokens at rest.

## Conclusion
This walkthrough provides the essential steps to integrate Sign-in-with-Apple and iCloud CalDAV in a NextJS application as of 2026. By following these steps, you can enable secure authentication and calendar synchronization for your coaching platform, Uplift AI.

---
*Generated for Pascal-arm · Uplift AI · June 2026*