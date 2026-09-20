import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            padding: "32px 24px",
            margin: "24px auto",
            maxWidth: "600px",
            textAlign: "center",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "16px",
            color: "#f87171",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#fca5a5" }}>
            Something went wrong displaying this section
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#e2e8f0" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#38bdf8",
              color: "#0284c7",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
