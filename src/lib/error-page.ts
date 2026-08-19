/**
 * Render a simple HTML error page for SSR failures.
 * This is displayed when the server encounters an uncaught error.
 */
export function renderErrorPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background-color: #0a0a0a;
          color: #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          text-align: center;
        }
        h1 {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #d4af37 0%, #e8c547 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #e5e5e5;
        }
        p {
          font-size: 1rem;
          color: #a0a0a0;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        a {
          display: inline-block;
          background: linear-gradient(135deg, #d4af37 0%, #e8c547 100%);
          color: #1a1a1a;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s, filter 0.2s;
        }
        a:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>500</h1>
        <h2>Something went wrong</h2>
        <p>We encountered an error processing your request. Please try again later or return to the home page.</p>
        <a href="/">Return Home</a>
      </div>
    </body>
    </html>
  `;
}
