import React, { useEffect, useState } from "react";
import { injectResponsivePanel } from "responsive-panel";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Inject responsive panel in development
    if (process.env.NODE_ENV !== "production") {
      const panel = injectResponsivePanel({
        breakpoints: [320, 480, 768, 1024, 1280],
        theme: theme,
        liveSync: true,
        showLabels: true,
        position: "bottom-right",
      });

      // Cleanup on unmount
      return () => {
        panel?.destroy();
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>React + Responsive Panel Demo</h1>
        <p>This React app demonstrates the responsive panel in action</p>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Interactive Demo</h2>
          <p>
            Click the floating button to open the responsive panel and see how
            this React app looks at different breakpoints.
          </p>
        </section>

        <section className="controls">
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
          <button onClick={toggleTheme}>Theme: {theme}</button>
        </section>

        <section className="grid">
          <div className="card">
            <h3>Responsive Design</h3>
            <p>
              Test how your React components adapt to different screen sizes
              using the responsive panel.
            </p>
          </div>
          <div className="card">
            <h3>Live Updates</h3>
            <p>
              Changes to state and props are reflected in real-time across all
              viewport previews.
            </p>
          </div>
          <div className="card">
            <h3>Development Tool</h3>
            <p>
              The responsive panel only appears in development mode, keeping
              your production builds clean.
            </p>
          </div>
        </section>

        <section className="form-section">
          <h3>Test Form</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Enter your message"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Responsive Panel Demo</p>
      </footer>

      <style jsx>{`
        .app {
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          transition: all 0.3s ease;
        }

        .app.light {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .app.dark {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }

        .header {
          text-align: center;
          padding: 60px 20px;
        }

        .header h1 {
          font-size: 3rem;
          margin: 0 0 20px 0;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero {
          text-align: center;
          margin-bottom: 60px;
        }

        .hero h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 60px;
        }

        .controls button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .controls button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card h3 {
          font-size: 1.5rem;
          margin: 0 0 15px 0;
        }

        .form-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 60px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .form-section button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-section button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .footer {
          text-align: center;
          padding: 40px 20px;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .controls {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 40px 20px;
          }

          .header h1 {
            font-size: 1.5rem;
          }

          .card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
