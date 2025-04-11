<template>
  <div class="full-view">
    <div class="dataset-view">
      <div class="newspaper-header">
        <h1 class="newspaper-title">A Corpus of Octopus Maps</h1>
        <!--<div class="newspaper-date">{{ currentDate }}</div>-->
      </div>

      <div class="cards-container">
        <div v-for="(dataset, index) in datasets" :key="index" class="card">
          <div class="card-image">
            <img 
            v-lazy="getImagePath(dataset.img)" 
              :alt="dataset.Name"
              @error="handleImageError"
            >
          </div>
          <div class="card-content">
            <div class="card-title-container">
              <h3 class="card-title">{{ dataset.Name }}<a :href="dataset.Link" target="_blank" class="link-icon" title="View Source">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </h3>
              
            </div>
            <p class="card-description">{{ dataset.Description.substring(0, 130) }}...</p>
            <div class="card-meta">
              <span class="meta-item">{{ dataset.Date }}</span>
              <span class="meta-item">{{ dataset.Creator }}</span>
              <span class="meta-item">Area: {{ dataset['Circulation Area(s)'] }}</span>
            </div>
            <button class="expand-btn" @click="toggleSidebar(index)">
              More Details
            </button>
          </div>
        </div>
      </div>

      <div class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <button class="close-btn" @click="closeSidebar">&times;</button>
        <div class="sidebar-content">
          <h2>{{ selectedDataset?.Name }}</h2>
          <div class="details-content">
            <img 
            v-lazy="getImagePath(selectedDataset?.img)" 
              :alt="selectedDataset?.Name" 
              class="detail-image"
              @error="handleImageError"
            >
            <a :href="selectedDataset?.Link" target="_blank" class="source-link">View Source</a>
            <p>{{ selectedDataset?.Description }}</p>
            <div class="detail-meta">
              <p><strong>Creator:</strong> {{ selectedDataset?.Creator }}</p>
              <p><strong>Date:</strong> {{ selectedDataset?.Date }}</p>
              <p><strong>Publisher:</strong> {{ selectedDataset?.Publisher }}</p>
              <p><strong>Place of Publication:</strong> {{ selectedDataset?.['Place of Publication'] }}</p>
              <p><strong>Circulation Area(s):</strong> {{ selectedDataset?.['Circulation Area(s)'] }}</p>
              <p><strong>Format:</strong> {{ selectedDataset?.Format }}</p>
              <p><strong>Theme(s):</strong> {{ selectedDataset?.['Theme(s)'] }}</p>
              <p><strong>Source:</strong> {{ selectedDataset?.Source }}</p>
              
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar-overlay" v-if="sidebarOpen" @click="closeSidebar"></div>
    </div>
  </div>
</template>

<script>
import datasets from '@/assets/data/data.json'

export default {
  name: 'DatasetView',
  data() {
    return {
      sidebarOpen: false,
      selectedCard: null,
      currentDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      datasets: datasets,
      fallbackImage: require('@/assets/images/cuteocto/1.jpg')
    }
  },
  computed: {
    selectedDataset() {
      return this.selectedCard !== null ? this.datasets[this.selectedCard] : null;
    }
  },
  methods: {
    getImagePath(imgName) {
      try {
        if (!imgName) return this.fallbackImage
        return require(`@/assets/images/data/${imgName}`)
      } catch (error) {
        console.error('Error loading image:', imgName, error)
        return this.fallbackImage
      }
    },
    handleImageError(event) {
      event.target.src = this.fallbackImage
    },
    toggleSidebar(cardId) {
      this.selectedCard = cardId;
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
      this.selectedCard = null;
    }
  }
}
</script>

<style scoped>
.full-view{
  /* background-color: #000; */
  width: 100vw;
  
  background-image:url("@/assets/images/background/1.jpg");
  background-size: cover; /* 使背景图片覆盖整个元素 */
  background-position: center center; /* 使背景图片居中显示 */
  /* background-repeat: no-repeat; */
}
.dataset-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem;
  background-color: #f4f1ea;
  font-family: 'Times New Roman', Times, serif;
  position: relative;
  min-height: 100vh;
  
}



.newspaper-header {
  text-align: center;
  /* margin-bottom: 4rem; */
  /* border-bottom: 2px solid #000; */
  /* padding-bottom: 1.5rem; */
}

/* .newspaper-title {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
} */
h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
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
.newspaper-date {
  font-style: italic;
  color: #666;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 1.5rem;
}

.card {
  background: #f0e6d2;  /* 更深的米黄色背景 */
  border: 1px solid #c4b397;  /* 更深的边框色 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  /* 更深的棕色装饰条 */
  background: repeating-linear-gradient(
    90deg,
    #5c2e0a,  
    #5c2e0a 2px,
    transparent 2px,
    transparent 4px
  );
}

.card-title-container {
  /*display: flex;*/
  align-items: center;
  gap: 0.5rem;
  
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-family: 'Playfair Display', serif;
  font-weight: bold;
  color: #1a0f0a;  /* 更深的标题色 */
}

.card-description {
  font-size: 1rem;
  margin-bottom: 1.2rem;
  flex: 1;
  line-height: 1.6;
  color: #2c1810;  /* 更深的描述文字色 */
}

.card-meta {
  margin-bottom: 1.2rem;
  padding-top: 0.8rem;
  border-top: 1px solid #c4b397;  /* 更深的分隔线 */
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #5c2e0a;  /* 更深的元数据色 */
  font-style: italic;
}

.meta-item {
  position: relative;
  padding-right: 1rem;
}

/* .meta-item:not(:last-child)::after {
  content: '•';
  position: absolute;
  right: 0;
} */

.expand-btn {
  padding: 0.6rem;
  font-size: 1rem;
  width: 100%;
  background-color: #5c2e0a;  /* 更深的按钮色 */
  color: #f0e6d2;  /* 更深的文字色 */
  border: none;
  font-family: 'Times New Roman', Times, serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.expand-btn:hover {
  background-color: #1a0f0a;  /* 更深的悬停色 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(92, 46, 10, 0.3);  /* 更深的阴影 */
}

.card-image {
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid #c4b397;  /* 更深的边框色 */
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 格子条纹纹理 */
  /* background: linear-gradient(45deg, rgba(196, 179, 151, 0.15) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(196, 179, 151, 0.15) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(196, 179, 151, 0.15) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(196, 179, 151, 0.15) 75%); */
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  pointer-events: none;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .dataset-view {
    max-width: 100%;
    padding: 2rem;
  }
  
  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .dataset-view {
    padding: 1.5rem;
  }

  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .dataset-view {
    padding: 1rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* 添加侧边栏样式 */
.sidebar {
  position: fixed;
  top: 0;
  right: -500px;
  width: 500px;
  height: 100vh;
  background: #f0e6d2;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
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
  color: #5c2e0a;
  z-index: 1001;
}

.sidebar-content {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

.sidebar-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #5c2e0a;
  padding-bottom: 0.5rem;
  color: #1a0f0a;
}

.details-content {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c1810;
}

.detail-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 1px solid #c4b397;
}

/* 添加遮罩层 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sidebar-overlay.visible {
  opacity: 1;
  visibility: visible;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    right: -100%;
  }
  
  .sidebar-open {
    right: 0;
  }
}

.link-icon {
  color: #5c2e0a;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-icon:hover {
  color: #1a0f0a;
}

.detail-meta {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #c4b397;
}

.detail-meta p {
  margin-bottom: 0.5rem;
  color: #2c1810;
}

.source-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #5c2e0a;
  color: #f0e6d2;
  text-decoration: none;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.source-link:hover {
  background-color: #1a0f0a;
}
</style> 