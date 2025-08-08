// hooks/usePageTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function pageTitle(titlesMap, defaultTitle = "Fresh Cart") {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    document.title = titlesMap[currentPath] || defaultTitle;
  }, [location.pathname, titlesMap, defaultTitle]);
}
