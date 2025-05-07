// 模块化封装3D粒子功能
function createParticleSystem() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) {
        console.error('粒子容器元素未找到');
        return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    particlesContainer.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        positions.push(x, y, z);
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        colors.push(r, g, b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        vertexColors: true
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.01;
        particles.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// 模块化封装时间轴滑动功能
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');
    if (!timelineItems.length ||!timeline) {
        console.error('时间轴元素未找到');
        return;
    }
    let isDragging = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 3;
        timeline.scrollLeft = scrollLeft - walk;
    });

    // 新增时间轴点击交互
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(1.1)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// 模块化封装觉醒温度计功能
function initThermometer() {
    const thermometerCanvas = document.getElementById('thermometer');
    if (!thermometerCanvas) {
        console.error('温度计画布元素未找到');
        return;
    }
    const ctx = thermometerCanvas.getContext('2d');
    const thermometerHeight = 300;
    const thermometerWidth = 50;
    const maxValue = 100;

    function drawThermometer(value) {
        ctx.clearRect(0, 0, thermometerWidth, thermometerHeight);
        ctx.beginPath();
        const color = getThermometerColor(value);
        ctx.fillStyle = color;
        ctx.rect(0, thermometerHeight - (value / maxValue) * thermometerHeight, thermometerWidth, (value / maxValue) * thermometerHeight);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, thermometerWidth, thermometerHeight);
    }

    function getThermometerColor(value) {
        if (value < 30) {
            return '#3399FF';
        } else if (value < 60) {
            return '#FF9933';
        } else {
            return '#FF3333';
        }
    }

    const thermometerValueElement = document.getElementById('thermometer-value');
    if (!thermometerValueElement) {
        console.error('温度计数值元素未找到');
        return;
    }
    let currentValue = 0;
    const increment = 1;
    function updateThermometer() {
        currentValue += increment;
        if (currentValue > maxValue) {
            currentValue = maxValue;
        }
        drawThermometer(currentValue);
        thermometerValueElement.textContent = currentValue;
        if (currentValue < maxValue) {
            setTimeout(updateThermometer, 50);
        }
    }
    updateThermometer();

    // 新增温度计点击交互
    thermometerCanvas.addEventListener('click', () => {
        const newIncrement = increment * 2;
        function boostThermometer() {
            currentValue += newIncrement;
            if (currentValue > maxValue) {
                currentValue = maxValue;
            }
            drawThermometer(currentValue);
            thermometerValueElement.textContent = currentValue;
            if (currentValue < maxValue) {
                setTimeout(boostThermometer, 50);
            }
        }
        boostThermometer();
    });
}

// 模块化封装AR海报生成功能
function initArPoster() {
    const generateArPosterButton = document.getElementById('generate-ar-poster');
    const arPoster = document.getElementById('ar-poster');
    const posterBgColorInput = document.getElementById('poster-bg-color');
    const posterFontFamilySelect = document.getElementById('poster-font-family');
    const posterFontSizeInput = document.getElementById('poster-font-size');
    const posterTextColorInput = document.getElementById('poster-text-color');

    if (!generateArPosterButton ||!arPoster ||!posterBgColorInput ||!posterFontFamilySelect ||!posterFontSizeInput ||!posterTextColorInput) {
        console.error('AR海报生成相关元素未找到');
        return;
    }

    const 宣言模板 = [
        "以代码为剑，劈开创新之路；以热爱为帆，驶向梦想彼岸，我是新时代青年，我为未来而战",
        "守护每一抹绿色，捍卫每一份公平，用青春践行使命，这是我的时代宣言"
    ];

    generateArPosterButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * 宣言模板.length);
        const 宣言 = 宣言模板[randomIndex];
        const posterContent = `<h2>青年宣言</h2><p>${宣言}</p>`;
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1200;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = posterBgColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${posterFontSizeInput.value}px ${posterFontFamilySelect.value}`;
        ctx.fillStyle = posterTextColorInput.value;
        ctx.fillText(posterContent, 50, 50);
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            arPoster.setAttribute('material', `src: ${url}; color: white;`);
        }, 'image/png');
    });
}

// 新增分享功能
function initShareFunction() {
    const shareButton = document.getElementById('share-button');
    const arPoster = document.getElementById('ar-poster');
    const hintBox = document.getElementById('hint-box');

    if (!shareButton ||!arPoster ||!hintBox) {
        console.error('分享功能相关元素未找到');
        return;
    }

    shareButton.addEventListener('click', () => {
        const material = arPoster.getAttribute('material');
        if (material) {
            const url = material.split('src: ')[1].split(';')[0];
            navigator.clipboard.writeText(url)
              .then(() => {
                    hintBox.style.display = 'block';
                    setTimeout(() => {
                        hintBox.style.display = 'none';
                    }, 2000);
                })
              .catch((error) => {
                    console.error('复制链接失败:', error);
                });
        }
    });
}

// 页面加载完成后初始化所有功能
window.onload = function () {
    createParticleSystem();
    initTimeline();
    initThermometer();
    initArPoster();
    initShareFunction();
};    