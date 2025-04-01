# NextAuth DynamoDB Boilerplate

A complete authentication solution using NextAuth.js with Google and GitHub OAuth providers, integrated with Amazon DynamoDB for user data storage.

## Technologies Used

| Technology                | Version       | Description                                     |
|---------------------------|---------------|-------------------------------------------------|
| [Next.js](https://nextjs.org/) | ^15.2.0 | React framework for server-side rendering       |
| [NextAuth.js](https://next-auth.js.org/) | ^4.24.11 | Authentication library for Next.js         |
| [React](https://reactjs.org/) | ^18.3.1 | JavaScript library for building user interfaces |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.1 | Utility-first CSS framework                |
| [Shadcn UI](https://ui.shadcn.com/) | Latest | Re-usable UI components built with Radix UI     |
| [TypeScript](https://www.typescriptlang.org/) | ^5.0.0 | Typed JavaScript                            |
| [AWS SDK for JS](https://aws.amazon.com/sdk-for-javascript/) | ^3.777.0 | AWS SDK for JavaScript in Node.js           |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.5.0 | Icon library for React                      |
| [Bun](https://bun.sh/) | ^1.0.0 | JavaScript runtime, bundler, and package manager |

## Features

- 🔐 Authentication with NextAuth.js
- 🔑 OAuth providers: Google and GitHub
- 💾 DynamoDB integration for user data storage
- 👤 User profile management
- 🛡️ Protected routes with middleware
- 📱 Responsive UI with Shadcn components
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Bun package manager (recommended)
- AWS account with DynamoDB access
- Google and GitHub OAuth developer accounts

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nextauth-dynamodb.git
cd nextauth-dynamodb
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables by copying the example file:

```bash
cp .env.example .env.local
```

4. Edit the `.env.local` file with your actual credentials:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-replace-this-in-production

# OAuth Provider Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# DynamoDB Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
DYNAMODB_USERS_TABLE=Users

# Additional Configuration (Optional)
NODE_ENV=development
```

5. Create a DynamoDB table named `Users` with the following schema:
   - Partition key: `id` (String)
   - Sort key: none
   - Global Secondary Index: `EmailIndex` with partition key `email` (String)

### Running the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
bun run build
bun run start
```

## Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── app/             # App directory (Next.js App Router)
│   │   ├── (dashboard)/ # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── auth/        # Authentication pages
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── layout/      # Layout components (Navbar, Sidebar)
│   │   └── ui/          # Shadcn UI components
│   ├── lib/             # Utility functions and libraries
│   │   ├── auth/        # Authentication utilities
│   │   ├── db/          # Database utilities
│   │   └── types.ts     # TypeScript types
│   └── middleware.ts    # NextAuth middleware for protected routes
├── .env.example         # Example environment variables
├── .env.local           # Environment variables (create this)
└── package.json         # Project dependencies
```

## Authentication Flow

1. User clicks "Sign In" and is redirected to the `/auth/signin` page
2. User selects either Google or GitHub for authentication
3. After successful authentication, the user is redirected to the dashboard
4. User data is stored in DynamoDB for later retrieval
5. Protected routes are secured with middleware

## Setting up OAuth Providers

### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Set up the OAuth consent screen if prompted
6. Select "Web application" as the application type
7. Add your domain to the "Authorized JavaScript origins" (e.g., `http://localhost:3000`)
8. Add your callback URL to "Authorized redirect URIs" (e.g., `http://localhost:3000/api/auth/callback/google`)
9. Copy the Client ID and Client Secret to your `.env.local` file

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application name and homepage URL
4. Set the Authorization callback URL to your callback URL (e.g., `http://localhost:3000/api/auth/callback/github`)
5. Click "Register application"
6. Copy the Client ID and generate a new Client Secret
7. Add these credentials to your `.env.local` file

## DynamoDB Setup

1. Log in to your AWS Management Console
2. Navigate to the DynamoDB service
3. Click "Create table"
4. Set the table name to match your `DYNAMODB_USERS_TABLE` environment variable (e.g., "Users")
5. Set the partition key to "id" with type "String"
6. Under "Table settings", choose "Customize settings"
7. Click "Create table"
8. Once created, go to "Indexes" tab
9. Click "Create index"
10. Set the partition key to "email" with type "String"
11. Set the index name to "EmailIndex"
12. Click "Create index"

## License

This project is licensed under the MIT License
