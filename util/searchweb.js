async function search(query) {
    const searchUrl = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    
    try {
        const response = await fetch(searchUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const links = Array.from(doc.querySelectorAll('a')).map(link => {
            const titleElement = link.querySelector('font[size="4"]');
            const title = titleElement ? titleElement.textContent : '';
            const url = link.getAttribute('href')?.replace('/read.php?a=', '') || '';
            return { title, url };
        }).filter(link => link.url);

        const results = await Promise.all(links.map(async link => {
            if (!link.url) return null;
            const metaResponse = await fetch(`https://api.dub.co/metatags?url=${encodeURIComponent(link.url)}`);
            const metaData = await metaResponse.json();
            return {
                title: link.title,
                url: link.url,
                description: metaData.description || '',
                image: metaData.image || '',
                poweredBy: metaData.poweredBy || ''
            };
        }));

        return results.filter(result => result); // Filter out null results
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
