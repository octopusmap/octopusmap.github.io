<template>
  <div class="home">
    <h1 class="newspaper-title">Unveiling the Visual Rhetoric of Persuasive Cartography: 
      <br>
      A Case Study of the Design of Octopus Maps</h1>
    <div class="gallery-section">
      <div class="image-gallery">
        <div v-for="(image, index) in octopusImages" :key="index" class="gallery-item">
          <img :src="image.src" :alt="image.alt" />
          <!-- <div class="image-caption">{{ image.caption }}</div> -->
        </div>
      </div>
    </div>

    <div class="research-section">
      <h2>Research Overview</h2>
      <div class="research-text">
        <p>When designed deliberately, data visualizations can become powerful persuasive tools, influencing viewers' opinions, values, and actions. While researchers have begun studying this issue (e.g., to evaluate the effects of persuasive visualization), we argue that a fundamental mechanism of persuasion resides in rhetorical construction, a perspective inadequately addressed in current visualization research.</p>
        
        <p>To fill this gap, we present a focused analysis of octopus maps, a visual genre that has maintained persuasive power across centuries and achieved significant social impact. Employing rhetorical schema theory, we collected and analyzed 90 octopus maps spanning from the 19th century to contemporary times. We closely examined how octopus maps implement their persuasive intents and constructed a design space that reveals how visual metaphors are strategically constructed and what common rhetorical strategies are applied to components such as maps, octopus imagery, and text.</p>
        
        <p>This website contains three pages: the Design Analysis page shows the visual rhetoric design space  derived from our analysis of octopus maps; the Corpus page shows the 90 historical and contemporary octopus maps we collected; the Explore page offers a small interactive game that enables users to explore our corpus in a playful way.</p>
      </div>
    </div>

    <div class="resources-section">
      <h2>We collected octopus maps from the following sources:</h2>
      
      <div class="resource-category">
        <h3>Digital Archives</h3>
        <ul>
          <li><a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a> - One of the largest map archives with over 75,000 maps spanning from 1600 to present.</li>
          <li><a href="https://persuasivemaps.library.cornell.edu" target="_blank">P.J. Modes Persuasive Cartography</a> - High-quality map focusing on persuasive cartography</li>
          <li><a href="http://www.loc.gov/rr/geogmap/" target="_blank">Library of Congress Geography & Map Division</a></li>
          <li><a href="https://catalog.archives.gov/id/1767935" target="_blank">National Archive Catalog: Propaganda Posters Distributed in Asia, ca. 1950–1955</a></li>
          <li><a href="https://www.library.illinois.edu/max/" target="_blank">University of Illinois Urbana-Champagne Map Library</a></li>
          <li><a href="https://www.parismuseescollections.paris.fr/es/recherche/type/oeuvre/ET/auteur/Centre%20de%20propagande%20des%20républicains%20nationaux" target="_blank">National Republican Propaganda Center of Paris Musées</a></li>
          <li><a href="https://www.rexmwess.com/cgpatchs/archives-cblack.html" target="_blank">Wess Wessling's United States Coast Guard Patch Archive</a></li>
          <li><a href="https://commons.wikimedia.org/wiki/Category:Octopuses_in_propaganda" target="_blank">Wikimedia Common: Octopus in Propaganda</a></li>
        </ul>
      </div>

      <div class="resource-category">
        <h3>Libraries with Map Collections</h3>
        <ul>
          <li><a href="https://www.library.gov.au" target="_blank">National Library of Australia</a></li>
          <li><a href="http://digitalcollections.nypl.org/" target="_blank">New York Public Library</a></li>
          <li><a href="http://www.bl.uk/reshelp/findhelprestype/webres/scanned/index.html" target="_blank">British Library</a></li>
          <li><a href="https://gallica.bnf.fr/accueil/en/html/accueil-en" target="_blank">Gallica</a> - French collection offering free access to digitized documents</li>
          <li><a href="https://www.onb.ac.at/en/" target="_blank">The Austrian National Library</a></li>
        </ul>
      </div>

      <div class="resource-category">
        <h3>Blogs</h3>
        <ul>
          <li><a href="http://www.maphistory.info" target="_blank">Map History</a> - One of the largest map history blogs from a former map librarian of British Library</li>
          <li><a href="http://www.mappingthenation.com/" target="_blank">Mapping the Nation</a></li>
          <li><a href="https://barronmaps.com" target="_blank">Barron Maps</a></li>
          <li><a href="https://bostonraremaps.com" target="_blank">Boston Rare maps</a></li>
          <li><a href="http://www.midafternoonmap.com/p/about.html" target="_blank">The Afternoon Tea</a> - Focuses on Ottoman/Turkish/Middle Eastern/Balkan cartography</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      octopusImages: [
        { src: require('@/assets/images/cuteocto/1.jpg'), alt: 'Cute Octopus 1', caption: 'SEE ME' },
        { src: require('@/assets/images/cuteocto/2.jpg'), alt: 'Cute Octopus 2', caption: 'OHHHHH' },
        { src: require('@/assets/images/cuteocto/3.jpg'), alt: 'Cute Octopus 3', caption: 'I AM Innocent' },
        { src: require('@/assets/images/cuteocto/4.jpg'), alt: 'Cute Octopus 4', caption: 'Cute Octopus 4' }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
  /* max-width: 1200px; */
  margin: 0 auto;
  width: 100%;
}
h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
  /* font-family: 'Trajan', serif; */
  font-size: 2rem;
  color: #2c1810;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 1rem;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: #2c1810;
}

/* h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
} */
/* .newspaper-title {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
} */
.content {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.research-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.research-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.research-text {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.research-text p {
  margin-bottom: 1.5rem;
}

.gallery-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.gallery-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.resources-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.resources-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.resource-category {
  margin-bottom: 2rem;
}

.resource-category h3 {
  color: #34495e;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
}

.resource-category ul {
  list-style-type: none;
  padding-left: 0;
}

.resource-category li {
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.resource-category a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s;
}

.resource-category a:hover {
  color: #2980b9;
  text-decoration: underline;
}
</style>

<!-- <meta name="viewport" content="initial-scale=1,maximum-scale=3,minimum-scale=1" />
111
<div style="background-color: #f0f0f0;">
<iframe src="http://kineticharts.idvxlab.com/#"></iframe>
</div> -->

