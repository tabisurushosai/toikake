(function() {
  // Readability is expected to be loaded in the same context or as a dependency.
  // In a Chrome extension, we can inject both or bundle them.
  
  if (typeof Readability === 'undefined') {
    return { error: 'Readability is not loaded' };
  }

  const documentClone = document.cloneNode(true);
  const reader = new Readability(documentClone);
  const article = reader.parse();

  if (article && article.textContent) {
    return {
      title: article.title,
      textContent: article.textContent.trim(),
      excerpt: article.excerpt,
      method: 'readability'
    };
  } else {
    // Fallback to document.body.innerText
    return {
      title: document.title,
      textContent: document.body.innerText.trim(),
      excerpt: '',
      method: 'fallback'
    };
  }
})();
