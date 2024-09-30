async function search(query) {
    const url = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const results = Array.from(doc.querySelectorAll('a')).map(link => {
            const titleElement = link.querySelector('font[size="4"]');
            const title = titleElement ? titleElement.textContent : '';
            const url = link.getAttribute('href')?.replace('/read.php?a=', '') || '';
            const descriptionElement = link.nextElementSibling;
            const description = descriptionElement ? descriptionElement.textContent.trim() : '';

            return { title, url, description };
        }).filter(result => result.title || result.description);

        return results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
