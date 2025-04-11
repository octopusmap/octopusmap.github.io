<template>
  <nav class="navbar">
    <div class="nav-brand">
      <!-- <router-link to="/" class="brand-link">OctopusMap</router-link> -->
      <p class="brand-link">Octopus Maps</p>
      <button class="menu-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="nav-links" :class="{ 'nav-open': isMenuOpen }">
      <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/DesignAnalysis" class="nav-link" @click="closeMenu">Design Analysis</router-link>
      <router-link to="/Corpus" class="nav-link" @click="closeMenu">Corpus</router-link>
      <router-link to="/game" class="nav-link" @click="closeMenu">Explore</router-link>
    </div>
    <div class="nav-image" @click="wiggleImage">
      <img :src="currentImage" :class="{ 'wiggle': isWiggling }" />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      currentImageIndex: 0,
      isWiggling: false,
      isMenuOpen: false,
      images: [
        require('@/assets/images/cuteocto/1.jpg'),
        require('@/assets/images/cuteocto/2.jpg'),
        require('@/assets/images/cuteocto/3.jpg'),
        require('@/assets/images/cuteocto/4.jpg')
      ]
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex]
    }
  },
  methods: {
    wiggleImage() {
      if (!this.isWiggling) {
        this.isWiggling = true;
        setTimeout(() => {
          this.isWiggling = false;
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }, 500);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f4f1ea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* border-bottom: 2px solid #5c2e0a; */
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-link {
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Playfair Display', serif;
  transition: color 0.3s ease;
}

.brand-link:hover {
  color: #5c2e0a;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
}

.menu-toggle.is-active span:first-child {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-active span:last-child {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c1810;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: 'Times New Roman', Times, serif;
}

/* .nav-link:hover {
  background-color: rgba(26, 15, 10, 0.1);
  
} */

.router-link-active {
  color: #f4f1ea !important;
  background-color: #1a0f0a;
  font-weight: bold;
}

.nav-image {
  width: 50px;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 25px;
  border: 2px solid #5c2e0a;
}

.nav-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: top center;
}

@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
}

.wiggle {
  animation: wiggle 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #f4f1ea;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 0.5rem;
    z-index: 999;
    /* border-top: 1px solid #5c2e0a; */
  }

  .nav-links.nav-open {
    display: flex;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    width: 100%;
    text-align: center;
  }

  .nav-image {
    width: 40px;
    height: 40px;
  }
}

@media screen and (max-width: 480px) {
  .navbar {
    padding: 1rem;
  }

  .brand-link {
    font-size: 1.2rem;
  }

  .nav-image {
    width: 35px;
    height: 35px;
  }
}
</style> 