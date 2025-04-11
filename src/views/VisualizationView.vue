<template>
  <div class="visualization-view">
    <div class="mobile-header">
      <div class="mobile-filter-toggle" @click="toggleFilters">
        <button class="toggle-btn">
          <span class="toggle-icon">{{ isFilterOpen ? '×' : '≡' }}</span>
          FILTER
        </button>
      </div>
      <!-- <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search..." />
      </div> -->
    </div>

    <div class="filters-section" :class="{ 'is-open': isFilterOpen }">
      <!-- <div class="desktop-search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search..." />
      </div> -->
      
      <div class="filter-groups">
        <!-- <h3 class="section-header">Conceptual Metaphor</h3> -->
          <div v-for="category in metaCategories" :key="category.name" class="filter-group">
            <div class="section-header category-header " @click="toggleMetaCategory(category.name)">
              <h3  style="font-size: 1.4rem;">{{ category.name }}</h3>
    
              <div class="category-actions">
                <button class="action-btn1" 
                        @click.stop="toggleAllMetaSubCategories(category.name)" 
                        :title="category.subCategories.every(sub => sub.selected) ? 'Clear' : 'Select'"
                        :class="{ 'selected': category.subCategories.every(sub => sub.selected) }">
       
                </button>
              </div>
            </div>
            <div v-if="category.isOpen" class="sub-categories">
              <div v-for="sub in category.subCategories" 
                  :key="sub.name" 
                  class="sub-category-item"
                  :class="{ 'selected': sub.selected }"
                  :style="{ '--category-color': getCategoryColor(sub.name) }"
                  @click="toggleMetaSubCategory(category.name, sub.name)">
                <span class="sub-category-name">{{ sub.name }}</span>
              </div>
            </div>
          </div>
        <h3 class="section-header">Rhetorical Strategies</h3>
        <div v-for="category in rhetoricalCategories" :key="category.name" class="filter-group">
          <div class="category-header" @click="toggleRhetoricalCategory(category.name)">
            <h3>{{ category.name }}</h3>
            <div class="category-actions">
              <button class="action-btn1" 
                      @click.stop="toggleAllRhetoricalSubCategories(category.name)" 
                      :title="category.subCategories.every(sub => sub.selected) ? 'Clear' : 'Select'"
                      :class="{ 'selected': category.subCategories.every(sub => sub.selected) }">
              </button>
            </div>
          </div>
          <div v-if="category.isOpen" class="sub-categories">
            <div v-for="sub in category.subCategories" 
                 :key="sub.name" 
                 class="sub-category-item"
                 :class="{ 'selected': sub.selected }"
                 :style="{ '--category-color': getCategoryColor(category.name) }"
                 @click="toggleRhetoricalSubCategory(category.name, sub.name)">
              <span class="sub-category-name">{{ sub.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section" :class="{ 'filter-open': isFilterOpen }">
      <div v-if="filteredVisualizations.length === 0" class="no-results">
        No Results Found
      </div>
      <div v-else>
        <section class="meta-section">
          <h2 class="section-title">Conceptual Metaphor</h2>
          <div class="cards-container">
            <div v-for="vis in filteredMetaVisualizations" 
                 :key="vis.name" 
                 class="card">
              <div class="card-header" :style="{ backgroundColor: getCategoryColor(vis.conceptualMetaphor.secondclass[0]) }">
                <h3 class="card-header-title">{{ vis.conceptualMetaphor.secondclass[0] }}</h3>
              </div>
              <div class="card-image">
                <img v-if="vis.image" v-lazy="require(`@/assets/images/tech/${vis.cases[0].caseimg}`)" :alt="vis.name">
                <div v-else class="placeholder-image">
                  <span>No Image</span>
                </div>
              </div>
              <div class="card-content">
                <div class="card-title">
                  <h3>{{ vis.name }}</h3>
                </div>
                <div class="sum">SUM: {{ vis.sum }}</div>
                <div class="description">{{ vis.description }}</div>
                <!-- <div class="tags">
                  <div class="tag-group">
                    <span class="tag source">{{ vis.conceptualMetaphor.firstclass[0] }}</span>
                    <span class="tag target">{{ vis.conceptualMetaphor.secondclass[0] }}</span>
                    <span class="tag target">{{ vis.conceptualMetaphor.thirdclass[0] }}</span>
                  </div>
                </div> -->
                <button class="expand-btn" @click="toggleSidebar(vis)">
                  More Details>>>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="strategy-section">
          <h2 class="section-title">Rhetorical Strategies</h2>
          <div class="cards-container">
            <div v-for="vis in filteredRhetoricalVisualizations" 
                 :key="vis.name" 
                 class="card">
                <div class="card-header" :style="{ backgroundColor: getCategoryColor(vis.conceptualMetaphor.secondclass[0]) }">
                <h3 class="card-header-title">{{ vis.conceptualMetaphor.thirdclass[0] }}</h3>
              </div>
              <div class="card-image">
                <img v-if="vis.image" v-lazy="require(`@/assets/images/tech/${vis.cases[0].caseimg}`)" :alt="vis.name">
                <div v-else class="placeholder-image">
                  <span>No Image</span>
                </div>
              </div>
              <div class="card-content">
                <div class="card-title">
                  <h3>{{ vis.name }}</h3>
                </div>
                <div class="sum">SUM:{{ vis.sum }}</div>
                <div class="description">{{ vis.description }}</div>
                <!-- <div class="tags">
                  <div class="tag-group">
                    <span class="tag source">{{ vis.conceptualMetaphor.firstclass[0] }}</span>
                    <span class="tag target">{{ vis.conceptualMetaphor.secondclass[0] }}</span>
                    <span class="tag target">{{ vis.conceptualMetaphor.thirdclass[0] }}</span>
                  </div>
                </div> -->

                <button class="expand-btn" @click="toggleSidebar(vis)">
                  More Details>>>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <div class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <button class="close-btn" @click="closeSidebar">&times;</button>
      <div v-if="selectedVisualization" class="sidebar-content">
        <h2>{{ selectedVisualization.name }}</h2>
        <div class="image-section">
          <!-- :src="require(`@/assets/images/cuteocto/${selectedVisualization.image}`)"  -->
          <img 
            v-if="selectedVisualization.image" 
            v-lazy="require(`@/assets/images/tech1/${selectedVisualization.cases[0].caseimg}`)" 
            :alt="selectedVisualization.name"
            class="detail-image"
          >
          <div v-else class="placeholder-image large">
            <span>No Image Available</span>
          </div>
        </div>
        <div class="details-content">
          <section>
            <h3>Classes</h3>
            <div class="detail-group">
              <h4>First Class:</h4>
              <div class="tags">
                <span class="tag source">{{ selectedVisualization.conceptualMetaphor.firstclass[0] }}</span>
              </div>
            </div>
            <div class="detail-group">
              <h4>Second Class:</h4>
              <div class="tags">
                <span class="tag target">{{ selectedVisualization.conceptualMetaphor.secondclass[0] }}</span>
              </div>
            </div>
            <div class="detail-group" v-if="selectedVisualization.conceptualMetaphor.thirdclass[0]!=''" >
              <h4>Third Class:</h4>
              <div class="tags">
                <span class="tag target">{{ selectedVisualization.conceptualMetaphor.thirdclass[0] }}</span>
              </div>
            </div>
          </section>

          <section>
            <h3>Description</h3>
            <div class="detail-group">
              <p>{{ selectedVisualization.description }}</p>
              </div>
            <h3>Cases</h3>
            <div v-for="(caseItem, index) in selectedVisualization.cases" :key="index" class="case-item">
              <h4>{{ caseItem.casename }}</h4>
              <p>{{ caseItem.casetext }}</p>
              <div class="case-image-container" @click="openLightbox(caseItem)">
                <!-- <img 
                  v-if="caseItem.caseimg" 
                  :src="require(`@/assets/images/tech/${caseItem.caseimg}`)" 
                  :alt="caseItem.casename"
                  class="case-image"
                > -->
                <img 
                  v-if="caseItem.caseimg" 
                  v-lazy="require(`@/assets/images/tech1/${caseItem.caseimg}`)" 
                  :alt="caseItem.casename"
                  class="case-image"
                > 
                <div class="zoom-icon">🔍</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div class="lightbox" v-if="lightboxOpen" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <div class="lightbox-image-container">
          <img 
            v-if="selectedCase.caseimg" 
            v-lazy="require(`@/assets/images/tech1/${selectedCase.caseimg}`)" 
            :alt="selectedCase.casename"
            class="lightbox-image"
          >
        </div>
        <div class="lightbox-caption">
          <h3>{{ selectedCase.casename }}</h3>
          <p>{{ selectedCase.casetext }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import visualizations from '@/assets/data/tech.json'
// import categories from '@/assets/data/techcat.json'
import rhetoricalStrategies from '@/assets/data/rhetorical_strategies.json'
import conceptualMetaphor from '@/assets/data/conceptual_metaphor.json'
import { onBeforeUnmount } from 'vue'

export default {
  name: 'VisualizationView',
  data() {
    return {
      isFilterOpen: false,
      searchQuery: '',
      sidebarOpen: false,
      selectedVisualization: null,
      lightboxOpen: false,
      selectedCase: null,
      metaVisualizations: visualizations.filter(v => v.firstclass === 'Conceptual Metaphor'),
      rhetoricalVisualizations: visualizations.filter(v => v.firstclass === 'Rhetorical Strategies'),
      metaCategories: conceptualMetaphor,
      rhetoricalCategories: rhetoricalStrategies,
      colorMap: {
        'Universal Strategies': '#40609c',
        'Octopus Depiction Strategies': '#877a84',
        'Cartographic Strategies': '#ad9c6f',
        'Textual Strategies': '#5b7e80',
        
        'Structural Metaphor': '#9c707f',
        'Ontological Metaphor': '#9e634a',
        'Orientational Metaphor': '#7f8a79'
      }
    }
  },
  computed: {
    filteredMetaVisualizations() {
      const selectedSubCategories = this.metaCategories.flatMap(category => 
        category.subCategories.filter(sub => sub.selected)
      )

      const selectedDimensions = selectedSubCategories.flatMap(sub => 
        sub.dimensions.filter(dim => dim.selected)
      )

      if (selectedDimensions.length === 0) {
        return []
      }

      return selectedDimensions
        .map(dim => {
          const tech = this.metaVisualizations.find(v => v.name === dim.name)
          if (!tech) return null
          return {
            name: tech.name,
            sum: tech.sum,
            image: tech.image,
            description: tech.description,
            conceptualMetaphor: {
              firstclass: [tech.firstclass],
              secondclass: [tech.secondclass],
              thirdclass: [tech.thirdclass]
            },
            cases: tech.case
          }
        })
        .filter(Boolean)
        .filter(tech => {
          if (!this.searchQuery) return true
          return tech.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
    },
    filteredRhetoricalVisualizations() {
      const selectedSubCategories = this.rhetoricalCategories.flatMap(category => 
        category.subCategories.filter(sub => sub.selected)
      )

      const selectedDimensions = selectedSubCategories.flatMap(sub => 
        sub.dimensions.filter(dim => dim.selected)
      )

      if (selectedDimensions.length === 0) {
        return []
      }

      return selectedDimensions
        .map(dim => {
          const tech = this.rhetoricalVisualizations.find(v => v.name === dim.name)
          if (!tech) return null
          return {
            name: tech.name,
            sum: tech.sum,
            image: tech.image,
            description: tech.description,
            conceptualMetaphor: {
              firstclass: [tech.firstclass],
              secondclass: [tech.secondclass],
              thirdclass: [tech.thirdclass]
            },
            cases: tech.case
          }
        })
        .filter(Boolean)
        .filter(tech => {
          if (!this.searchQuery) return true
          return tech.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
    },
    filteredVisualizations() {
      return [...this.filteredMetaVisualizations, ...this.filteredRhetoricalVisualizations]
    }
  },
  methods: {
    toggleFilters() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    toggleSidebar(visualization) {
      this.selectedVisualization = visualization
      this.sidebarOpen = true
    },
    closeSidebar() {
      this.sidebarOpen = false
      this.selectedVisualization = null
    },
    toggleMetaCategory(categoryName) {
      const category = this.metaCategories.find(c => c.name === categoryName)
      if (category) {
        category.isOpen = !category.isOpen
      }
    },
    toggleMetaSubCategory(categoryName, subName) {
      const category = this.metaCategories.find(c => c.name === categoryName)
      if (category) {
        const sub = category.subCategories.find(s => s.name === subName)
        if (sub) {
          sub.selected = !sub.selected
        }
      }
    },
    toggleAllMetaSubCategories(categoryName) {
      const category = this.metaCategories.find(c => c.name === categoryName)
      if (category) {
        const allSelected = category.subCategories.every(sub => sub.selected)
        category.subCategories.forEach(sub => sub.selected = !allSelected)
      }
    },
    toggleRhetoricalCategory(categoryName) {
      const category = this.rhetoricalCategories.find(c => c.name === categoryName)
      if (category) {
        category.isOpen = !category.isOpen
      }
    },
    toggleRhetoricalSubCategory(categoryName, subName) {
      const category = this.rhetoricalCategories.find(c => c.name === categoryName)
      if (category) {
        const sub = category.subCategories.find(s => s.name === subName)
        if (sub) {
          sub.selected = !sub.selected
        }
      }
    },
    toggleAllRhetoricalSubCategories(categoryName) {
      const category = this.rhetoricalCategories.find(c => c.name === categoryName)
      if (category) {
        const allSelected = category.subCategories.every(sub => sub.selected)
        category.subCategories.forEach(sub => sub.selected = !allSelected)
      }
    },
    openLightbox(caseItem) {
      this.selectedCase = caseItem;
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxOpen = false;
      this.selectedCase = null;
      document.body.style.overflow = '';
    },
    getCategoryColor(categoryName) {
      // 直接查找类别名称对应的颜色
      if (this.colorMap[categoryName]) {
        return this.colorMap[categoryName]
      }

      // 默认颜色
      return '#c4b397'
    }
  },
  mounted() {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        this.isFilterOpen = true;
      } else {
        this.isFilterOpen = false;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });
  }
}
</script>

<style scoped>
.visualization-view {
  display: flex;
  min-height: calc(100vh - 64px);
  background-color: #f4f1ea;
  position: relative;
}

.visualization-view::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
    linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
    linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%); 
        /* linear-gradient(90deg, rgba(0,0,0,.03) 50%, transparent 50%),
    linear-gradient(90deg, rgba(0,0,0,.05) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(0,0,0,.03) 50%),
    linear-gradient(90deg, transparent 50%, rgba(0,0,0,.05) 50%); */
  background-size: 13px, 29px, 37px, 53px;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
}

.mobile-header {
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f0e6d2;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #c4b397;
}

.mobile-filter-toggle {
  display: none;
  align-items: center;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #5c2e0a;
  color: #f0e6d2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  white-space: nowrap;
}

.toggle-btn:hover {
  background-color: #1a0f0a;
}

.toggle-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.search-bar {
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #c4b397;
  border-radius: 2px;
  background-color: #f4f1ea;
  color: #5c2e0a;
  font-family: 'Times New Roman', serif;
}

.search-bar input::placeholder {
  color: #8b7355;
}

.filters-section {
  width: 300px;
  padding: 2rem;
  background-color: #f0e6d2;
  border-right: 1px solid #c4b397;
  overflow-y: auto;
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  z-index: 1;
}

.filter-groups {
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
}

.filter-group {
  margin-bottom: 1.5rem;
  background-color: transparent;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0.5rem 0; */
  background-color: transparent;
  /* border-bottom: 2px solid #5c2e0a; */
  cursor: pointer;
}

.category-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: #5c2e0a;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  transition: all 0.3s ease;
}

.action-btn::before {
  content: '\f070';
  font-family: 'Font Awesome 6 Free';
  font-weight: 400;
  opacity: 0.4;
}

.action-btn:hover {
  color: #1a0f0a;
  transform: scale(1.1);
}

.action-btn.selected::before {
  content: '\f06e';
  font-weight: 900;
  opacity: 0.4;
}


.action-btn1 {
  background: none;
  border: none;
  color: #5c2e0a;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  transition: all 0.3s ease;
}

.action-btn1::before {
  content: 'SelectAll';
  font-family: 'Times New Roman', serif;
  font-weight: 400;
  opacity: 0.4;
}

.action-btn1:hover {
  color: #1a0f0a;
  transform: scale(1.1);
}

.action-btn1.selected::before {
  content: 'ClearAll';
  font-weight: 900;
  opacity: 0.4;
}

.sub-categories {
  padding: 0.5rem 0;
}

.sub-category-item {
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
  font-family: 'Times New Roman', serif;
  color: #4a3728;
  background-color: #f8f5f0;
  border: 1px solid #c4b397;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.sub-category-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--category-color);
}

.sub-category-item:hover {
  background-color: rgba(26, 15, 10, 0.1);
}

.sub-category-item.selected {
  background-color: #f8f5f0;
  color: #4a3728;
  border-color: #5c2e0a;
}

.sub-category-item.selected::before {
  background-color: var(--category-color);
}

.sub-category-name {
  font-size: 0.9rem;
  word-break: break-word;
  margin-left: 0.5rem;
  flex: 1;
}

.sub-category-item::after {
  content: '\f070';
  font-family: 'Font Awesome 6 Free';
  font-weight: 400;
  font-size: 1rem;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  margin-left: 0.5rem;
}

.sub-category-item.selected::after {
  content: '\f06e';
  font-weight: 900;
  opacity: 0.4;
}

.content-section {
  flex: 1;
  padding: 2rem;
  background-color: #f4f1ea;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  margin-left: 300px;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: #f0e6d2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid #c4b397;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0px;
  background: #5c2e0a;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(92, 46, 10, 0.3) 5px,
    rgba(92, 46, 10, 0.3) 10px
  );
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(26, 15, 10, 0.2);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4b397;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.placeholder-image.large {
  height: 300px;
  font-size: 1.1rem;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  margin-bottom: 0.5rem;
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
}

.sum {
  color: #5c2e0a;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', serif;
  font-style: italic;
}

.description {
  color: #4a3728;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', serif;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  font-size: 0.8rem;
  font-family: 'Times New Roman', serif;
  border: 1px solid #c4b397;
}

.tag.source {
  background-color: #f0e6d2;
  color: #5c2e0a;
}

.tag.target {
  background-color: #f0e6d2;
  color: #5c2e0a;
}

.expand-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #5c2e0a;
  color: #f0e6d2;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin-top: auto;
}

.expand-btn:hover {
  background-color: #1a0f0a;
}

.sidebar {
  position: fixed;
  top: 64px;
  right: -500px;
  width: 500px;
  height: calc(100vh - 64px);
  background: #f0e6d2;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  overflow-y: auto;
  z-index: 99;
  border-left: 1px solid #c4b397;
}

.sidebar-open {
  right: 0;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.sidebar-content {
  padding: 2rem;
}

.sidebar-content h2 {
  margin-bottom: 2rem;
  padding-right: 2rem;
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
  border-bottom: 2px solid #5c2e0a;
  padding-bottom: 0.5rem;
}

.image-section {
  margin: -2rem -2rem 2rem -2rem;
  background-color: #f8f9fa;
}

.detail-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 1rem;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-group {
  margin-bottom: 1rem;
}

.detail-group h4 {
  margin-bottom: 0.5rem;
  color: #2c1810;
  font-family: 'Times New Roman', serif;
  font-weight: bold;
}

section {
  border-bottom: 1px solid #c4b397;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.desktop-search-bar {
  margin-bottom: 2rem;
}

.desktop-search-bar input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #c4b397;
  border-radius: 2px;
  background-color: #f4f1ea;
  color: #1a0f0a;
  font-family: 'Times New Roman', serif;
}

.desktop-search-bar input::placeholder {
  color: #8b7355;
}

.case-item {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #c4b397;
}

.case-item:last-child {
  border-bottom: none;
}

.case-item h4 {
  color: #2c1810;
  font-family: 'Times New Roman', serif;
  margin-bottom: 0.5rem;
}

.case-item p {
  color: #4a3728;
  font-family: 'Times New Roman', serif;
  margin-bottom: 1rem;
}

.case-image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  margin-top: 1rem;
}

.case-image-container:hover .zoom-icon {
  opacity: 1;
}

.case-image-container:hover .case-image {
  transform: scale(1.05);
}

.zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.case-image {
  width: 100%;
  /* max-height: 200px; */
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 1rem;
  border: 1px solid #c4b397;
  transition: transform 0.3s ease;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #f0e6d2;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.8);
}

.lightbox-image-container {
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
}

.lightbox-image {
  min-height: 60vh;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  padding: 1rem;
}

.lightbox-caption {
  padding: 1.5rem;
  background: #f0e6d2;
  border-top: 1px solid #c4b397;
}

.lightbox-caption h3 {
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
  margin-bottom: 0.5rem;
}

.lightbox-caption p {
  color: #4a3728;
  font-family: 'Times New Roman', serif;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .visualization-view {
    flex-direction: column;
  }

  .mobile-header {
    display: flex;
  }

  .mobile-filter-toggle {
    display: flex;
  }

  .search-bar {
    flex: 1;
    margin-bottom: 0;
  }

  .filters-section {
    position: fixed;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    transform: translateX(-100%);
    z-index: 99;
    border-right: none;
    border-top: 1px solid #c4b397;
    background-color: #f0e6d2;
  }

  .filters-section.is-open {
    transform: translateX(0);
  }

  .content-section {
    margin-left: 0;
  }

  .content-section.filter-open {
    background-color: rgba(244, 241, 234, 0.7);
  }

  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .sidebar {
    top: 120px;
    height: calc(100vh - 120px);
    width: 100%;
    right: -100%;
  }

  .sidebar-open {
    right: 0;
  }

  .desktop-search-bar {
    display: none;
  }

  .lightbox {
    padding: 1rem;
  }
  
  .lightbox-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .lightbox-image-container {
    max-height: 60vh;
  }
  
  .lightbox-image {
    max-height: 60vh;
  }
}

@media (max-width: 480px) {
  .cards-container {
    grid-template-columns: 1fr;
  }

  .card {
    margin: 0 1rem;
  }

  .filters-content {
    padding: 1rem;
  }
}

.section-title {
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #5c2e0a;
}

.strategy-section,
.meta-section {
  margin-bottom: 3rem;
}

.strategy-section:first-child,
.meta-section:first-child {
  margin-top: 0;
}

.card-header {
  padding: 0.25rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.card-header-title {
  margin: 0;
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.section-header {
  color: #1a0f0a;
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  /* border-bottom: 2px solid #5c2e0a; */
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

/* .section-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #c4b397;
} */
</style> 