async function search(query) {
    const url = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const results = Array.from(doc.querySelectorAll('a')).map(link => {
            const titleElement = link.querySelector('font[size="4"]');
            const descriptionElement = link.nextElementSibling;

            return {
                title: titleElement ? titleElement.textContent : "No title",
                url: link.getAttribute('href'),
                description: descriptionElement ? descriptionElement.textContent.trim() : "No description"
            };
        }).filter(result => result.title !== "No title");

        return results;
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}
