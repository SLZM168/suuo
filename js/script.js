// 页面加载动画
document.addEventListener("DOMContentLoaded", () => {
  // 添加淡入动画
  fadeInElements()

  // 图片懒加载优化
  lazyLoadImages()

  // 平滑滚动增强
  smoothScrolling()

  // 添加阅读进度条
  createProgressBar()

  // 图片点击放大功能
  setupImageZoom()
})

// 淡入动画
function fadeInElements() {
  const elements = document.querySelectorAll(
    ".section, .chart-wrapper, .company-card, .intro-section, .conclusion-section",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0"
          entry.target.style.transform = "translateY(20px)"
          entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease"

          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, 100)

          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// 图片懒加载
function lazyLoadImages() {
  const images = document.querySelectorAll(".chart-image")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target

        // 添加加载动画
        img.style.opacity = "0"
        img.style.transition = "opacity 0.5s ease"

        // 检查图片是否已加载
        if (img.complete) {
          // 图片已加载，直接显示
          img.style.opacity = "1"
        } else {
          // 图片未加载，监听load事件
          img.addEventListener("load", () => {
            img.style.opacity = "1"
          })
        }

        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })
}

// 平滑滚动
function smoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// 创建阅读进度条
function createProgressBar() {
  // 创建进度条元素
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
    `
  document.body.appendChild(progressBar)

  // 更新进度条
  function updateProgressBar() {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight - windowHeight
    const scrolled = window.scrollY
    const progress = (scrolled / documentHeight) * 100

    progressBar.style.width = progress + "%"
  }

  // 监听滚动事件
  window.addEventListener("scroll", updateProgressBar)

  // 初始化进度条
  updateProgressBar()
}

// 图片点击放大功能
function setupImageZoom() {
  const images = document.querySelectorAll(".chart-image")

  // 添加CSS动画样式
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
  `
  document.head.appendChild(style)

  images.forEach((img) => {
    img.style.cursor = "pointer"

    img.addEventListener("click", function () {
      // 创建遮罩层
      const overlay = document.createElement("div")
      overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `

      // 创建放大的图片
      const enlargedImg = document.createElement("img")
      enlargedImg.src = this.src
      enlargedImg.alt = this.alt
      enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            `

      // 添加关闭提示
      const closeHint = document.createElement("div")
      closeHint.textContent = "点击任意处关闭"
      closeHint.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                color: white;
                font-size: 16px;
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                backdrop-filter: blur(10px);
            `

      overlay.appendChild(enlargedImg)
      overlay.appendChild(closeHint)
      document.body.appendChild(overlay)

      // 点击关闭
      overlay.addEventListener("click", () => {
        overlay.style.animation = "fadeOut 0.3s ease"
        setTimeout(() => {
          document.body.removeChild(overlay)
        }, 300)
      })
    })
  })
}

// 返回顶部按钮
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // 创建返回顶部按钮（如果不存在）
  let backToTop = document.getElementById("backToTop")
  if (!backToTop) {
    backToTop = document.createElement("div")
    backToTop.id = "backToTop"
    backToTop.innerHTML = "↑"
    backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 1000;
        `

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    backToTop.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
    })

    backToTop.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })

    document.body.appendChild(backToTop)
  }

  // 显示/隐藏按钮
  if (scrollTop > 300) {
    backToTop.style.opacity = "1"
  } else {
    backToTop.style.opacity = "0"
  }
})
