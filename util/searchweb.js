async function search(query) {
    const url = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const results = Array.from(doc.querySelectorAll('a')).map(link => {
            const targetUrl = link.getAttribute('href')?.replace('/read.php?a=', '') || '';
            return fetch(targetUrl)
                .then(res => res.text())
                .then(pageText => {
                    const pageDoc = new DOMParser().parseFromString(pageText, "text/html");
                    const metaTitle = pageDoc.querySelector('meta[property="og:title"]')?.content || pageDoc.title || '';
                    const metaDescription = pageDoc.querySelector('meta[property="og:description"]')?.content || pageDoc.querySelector('meta[name="description"]')?.content || '';
                    const metaImage = pageDoc.querySelector('meta[property="og:image"]')?.content || '';
                    const metaUrl = targetUrl;

                    return { title: metaTitle, description: metaDescription, image: metaImage, url: metaUrl };
                })
                .catch(error => {
                    console.error('Error fetching target page:', error);
                    return { title: '', description: '', image: '', url: targetUrl }; // Return blank values on error
                });
        });

        return Promise.all(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
