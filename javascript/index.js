async function fetchGitHubRepos(username) {
    const reposSection = document.getElementById('projects');
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        const repos = await response.json();

        if (response.ok) {
            repos.forEach(repo => {
                // check if repo.name contains ilaario
                if (repo.name.includes('ilaario')) {
                    return;
                }
                const repoContainer = document.createElement('div');
                repoContainer.className = 'repo';
                repoContainer.id = `repo${repo.id}`;
                const repoTitle = document.createElement('h3');
                const repoDescription = document.createElement('p');

                console.log(repo);
                repoContainer.addEventListener('click', function() {
                    window.open(repo.html_url, '_blank');
                });

                repoTitle.textContent = repo.name;
                repoDescription.textContent = repo.description || "Nessuna descrizione disponibile";

                repoContainer.appendChild(repoTitle);
                repoContainer.appendChild(repoDescription);

                reposSection.appendChild(repoContainer);
            });
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Impossibile caricare le repository.";
            reposSection.appendChild(errorMessage);
        }
    } catch (error) {
        console.error('Errore nella richiesta API:', error);
        const errorMessage = document.createElement('p');
    }
}
