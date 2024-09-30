async function search(query) {
    const url = `https://api.allorigins.win/raw?url=https://frogfind.com/?q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.text();
        
        const results = parseFrogFindResults(data);
        return results;
    } catch (error) {
        console.error('Error fetching results:', error);
        return null;
    }
}

function parseFrogFindResults(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const results = [];
    
    const links = doc.querySelectorAll('a[href^="/read.php?a="]');
    
    links.forEach(link => {
        const title = link.querySelector('font[size="4"]').innerText;
        const url = link.getAttribute('href').replace('/read.php?a=', '');
        const description = link.parentElement.nextElementSibling.innerText || '';

        results.push({ title, url, description });
    });

    return results;
}

// Example usage:
search('google').then(results => console.log(results));
