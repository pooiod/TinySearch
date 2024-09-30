async function search(query) {
    const url = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const results = Array.from(doc.querySelectorAll('a')).map(link => ({
            title: link.querySelector('font[size="4"]').textContent,
            url: link.getAttribute('href'),
            description: link.nextElementSibling.textContent.trim()
        })).filter(result => result.title);
        return results;
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}
