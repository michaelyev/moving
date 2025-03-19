'use client';
import React, { useEffect } from "react";

export const ThumbtackReview = () => {
  useEffect(() => {
    const scriptId = "ThumbtackReviewWidgetScript";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://www.thumbtack.com/profile/widgets/scripts/?service_pk=537580068300922899&widget_id=review&type=star";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      <div className="widget" id="tt-review-widget-star" style={styles.container}>
        <img
          src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg"
          alt="Thumbtack"
          style={styles.logo}
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.thumbtack.com/wa/seattle/movers/movestream-moving/service/537580068300922899"
          style={styles.link}
        >
          <div>Movestream</div>
        </a>
        <div id="tt-dynamic" style={styles.reviewContainer}>
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
              alt="star"
              style={styles.star}
            />
          ))}
          <span style={styles.reviewText}>62 reviews</span>
        </div>
      </div>
    </div>
  );
};

// ✅ CSS-in-JS styles for better control
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center", // ✅ Centers horizontally
    alignItems: "center", // ✅ Centers vertically (optional)
    width: "100%",
    height: "100%", // Adjust if you want it in full screen height
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "fit-content",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "20px",
    marginBottom: "5px",
  },
  link: {
    textDecoration: "none",
    color: "#0073e6",
    fontWeight: "bold",
    fontSize: "16px"
  },
  reviewContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  star: {
    width: "16px",
    height: "16px",
  },
  reviewText: {
    fontSize: "14px",
    color: "#555",
    marginLeft: "5px",
  },
};

