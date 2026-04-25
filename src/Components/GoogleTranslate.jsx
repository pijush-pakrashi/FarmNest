import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (window.google && window.google.translate) return; // Prevent re-initialization

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (!document.getElementById("google_translate_element").hasChildNodes()) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,bn,ta,te,mr,ur,gu",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element" className="text-sm" />;
};

export default GoogleTranslate;
