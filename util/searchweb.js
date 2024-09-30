async function search(query) {
    const frogfindUrl = `https://test.cors.workers.dev/?${encodeURIComponent("http://frogfind.com/?q=" + query)}`;
    try {
        const response = await fetch(frogfindUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const links = Array.from(doc.querySelectorAll('a')).map(link => {
            const url = link.getAttribute('href')?.replace('/read.php?a=', '') || '';
            return url;
        }).filter(url => url); // Filter out empty URLs

        const results = await Promise.all(links.map(async (url) => {
            const metaResponse = await fetch(`https://api.dub.co/metatags?url=${encodeURIComponent(url)}`);
            const metaData = await metaResponse.json();
            return {
                title: metaData.title || '',
                description: metaData.description || '',
                image: metaData.image || '',
                url: url
            };
        }));

        return results.filter(result => result.title || result.description); // Filter out entries without title or description
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
