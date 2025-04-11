<template>
  <div class="game-view">
    <h1>Image Path Game</h1>
    <div class="game-intro">
      <p>On this page, we have developed a small game to help you explore our corpus in a playful manner.We employed the <span class="highlight">ResNet18 & Cosine Similarity</span> to calculate the similarity between images.</p>
      <p>Now you can freely choose any two octopus maps, and the game will display the shortest similarity path recommended by the algorithm.</p>
    </div>
    <div class="image-gallery-container">
      <div class="image-gallery" ref="gallery">
        <div class="gallery-row">
          <div 
            v-for="(image, index) in images" 
            :key="index" 
            class="image-container"
            :class="{ 'selected': isSelected(image) }"
            @click="toggleImage(image)"
          >
            <div class="image-wrapper">
              <img 
                :src="getThumbnailPath(image)" 
                :alt="image"
                class="thumbnail"
              >
              <img 
                :src="getImagePath(image)" 
                :alt="image"
                @error="handleImageError"
                @load="handleImageLoad"
                class="full-image"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-controls">
        <button @click="scrollGallery('left')" class="scroll-btn">←</button>
        <button @click="scrollGallery('right')" class="scroll-btn">→</button>
      </div>
    </div>
    <button @click="resetGame" class="reset-btn">Reset</button>
    <div v-if="selectedImages.length === 2" class="path-container">
      <h2>Shortest Path</h2>
      <div class="path-images">
        <div v-for="(image, index) in shortestPath" :key="index" class="path-image">
          <div class="image-wrapper">
            <img 
              :src="getThumbnailPath(image)" 
              :alt="image"
              class="thumbnail"
            >
            <img 
              :src="getImagePath(image)" 
              :alt="image"
              @error="handleImageError"
              @load="handleImageLoad"
              class="full-image"
            >
          </div>
          <div class="path-number">{{ index + 1 }}</div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'GameView',
  data() {
    return {
      images: [],
      selectedImages: [],
      shortestPath: [],
      currentScroll: 0,
      fallbackImage: require('@/assets/images/cuteocto/1.jpg'),
      shortestPaths: {} // 存储预计算的最短路径
    }
  },
  created() {
    this.loadShortestPaths()
  },
  methods: {
    async loadShortestPaths() {
      try {
        const shortestPathsData = require('@/assets/data/shortest_paths.json')
        // 将数组转换为以 source-target 为键的映射
        this.shortestPaths = shortestPathsData.reduce((acc, pathObj) => {
          const key = `${pathObj.source}-${pathObj.target}`
          acc[key] = pathObj.path
          return acc
        }, {})
        
        // 从最短路径中提取所有唯一的图像名称
        const allImages = new Set()
        shortestPathsData.forEach(pathObj => {
          pathObj.path.forEach(image => {
            if (image !== 'Next.png') { //排除 Next.png
              allImages.add(image);
            }
          })
        })
        this.images = Array.from(allImages)
      
      } catch (error) {
        console.error('Error loading shortest paths:', error)
      }
    },
    getImagePath(imageName) {
      try {
        return require(`@/assets/images/data/${imageName}`)
      } catch (error) {
        console.error('Error loading image:', imageName, error)
        return this.fallbackImage
      }
    },
    getThumbnailPath(imageName) {
      try {
        return require(`@/assets/images/thumbnails/${imageName}`)
      } catch (error) {
        return require('@/assets/images/cuteocto/1.jpg')
      }
    },
    handleImageError(event) {
      event.target.src = this.fallbackImage
    },
    handleImageLoad(event) {
      event.target.classList.add('loaded')
    },
    toggleImage(image) {
      if (this.selectedImages.includes(image)) {
        this.selectedImages = this.selectedImages.filter(img => img !== image)
      } else if (this.selectedImages.length < 2) {
        this.selectedImages.push(image)
        if (this.selectedImages.length === 2) {
          this.findShortestPath()
        }
      }
    },
    isSelected(image) {
      return this.selectedImages.includes(image)
    },
    findShortestPath() {
      const start = this.selectedImages[0]
      const end = this.selectedImages[1]
      
      // 从预计算的结果中获取路径
      const pathKey = `${start}-${end}`
      if (this.shortestPaths[pathKey]) {
        this.shortestPath = this.shortestPaths[pathKey]
      } else {
        // 如果找不到预计算的路径，尝试反向查找
        const reversePathKey = `${end}-${start}`
        if (this.shortestPaths[reversePathKey]) {
          this.shortestPath = [...this.shortestPaths[reversePathKey]].reverse()
        } else {
          // 如果都找不到，使用默认的2节点路径
          this.shortestPath = [start, end]
        }
      }
    },
    getNeighbors(image) {
      const similarities = this.similarityMatrix[image];
      return Object.entries(similarities)
        .sort(([, a], [, b]) => a - b) // 按相似度从小到大排序
        .slice(0, 10) // 取相似度最小的10个邻居
        .map(([img]) => img);
    },

    scrollGallery(direction) {
      const gallery = this.$refs.gallery
      const scrollAmount = 800 // 增加滚动距离
      this.currentScroll += direction === 'left' ? -scrollAmount : scrollAmount
      gallery.scrollTo({
        left: this.currentScroll,
        behavior: 'smooth'
      })
    },
    resetGame() {
      this.selectedImages = []
      this.shortestPath = []
    }
  }
}
</script>

<style scoped>
.game-view {
  padding: 2rem;
  width: 100%;
  min-height: 150vh;
  margin: 0;
  background-color: #f4f1ea;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4c9b8' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  
  /* background-image: 
  linear-gradient(rgba(244, 241, 234, 0.5), rgba(244, 241, 234, 0.5)),
  url("../assets/images/background/4.jpg"); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #d4c9b8;
  position: relative;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  /* font-family: 'Playfair Display', serif; */
  font-family: "trajanpro", serif;
  /* font-size: 3.5rem; */
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

/* h1::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: #2c1810;
  margin-bottom: 8px;
} */

.image-gallery-container {
  position: relative;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border: 1px solid #d4c9b8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.image-gallery {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.image-gallery::-webkit-scrollbar {
  display: none;
}

.gallery-row {
  display: flex;
  gap: 1rem;
  min-width: max-content;
  width: 100%;
}

.image-container {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;
}

.image-container.selected {
  box-shadow: 0 0 0 3px #5c2e0a;
}

.image-container:hover {
  transform: scale(1.05);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px);
  transform: scale(1.1);
}

.full-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.full-image.loaded {
  opacity: 1;
}

.image-container img,
.path-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.scroll-btn {
  background: rgba(92, 46, 10, 0.8);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  pointer-events: auto;
  font-size: 1.5rem;
}

.scroll-btn:hover {
  background: rgba(92, 46, 10, 1);
}

.path-container {
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.path-images {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

.path-image {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
}

.path-number {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(92, 46, 10, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
}

.path-container h2 {
  font-family: 'Playfair Display', serif;
  color: #2c1810;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.path-container h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #2c1810;
}

.reset-btn {
  background: #8B4513;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin: 1rem auto;
  display: block;
}

.reset-btn:hover {
  background: #654321;
  transform: translateY(-2px);
}

.reset-btn:active {
  transform: translateY(0);
}

.game-intro {
  max-width: 800px;
  margin: 0 auto 2rem;
  text-align: center;
  font-family: 'Times New Roman', serif;
  line-height: 1.6;
  color: #4a3728;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  border: 1px solid #d4c9b8;
}

.game-intro p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.game-intro p:last-child {
  margin-bottom: 0;
}

.highlight {
  color: #5c2e0a;
  font-style: italic;
}
</style> 